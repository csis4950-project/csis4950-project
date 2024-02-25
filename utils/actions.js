"use server"

import { deleteSession, setErrorSession, setSession } from "./session";
import {
  createDepartment,
  createDepartmentMember,
  createOrganization,
  createUser,
  createAnnouncements,
  findUserByEmail,
  getUserSessionData,
  deleteAnnouncementById
} from "@/utils/db";
import { validateName, validateEmail, validatePassword } from "@/utils/validation";
import { fetchIsValid } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData) {
  const user = await findUserByEmail(formData.get("email"));
  if (user === null) {
    throw new Error("User does not exist or the password provided is incorrect");
  }

  if (!await fetchIsValid(formData.get("password"), user.password)) {
    throw new Error("User does not exist or the password provided is incorrect");
  }

  const userSessionData = await getUserSessionData(user.email);
  setSession(userSessionData);
  redirect("user/dashboard");
}

export async function logout() {
  await deleteSession();
}

export async function signUpOwner(formData) {
  try {
    const inputValidationResults = {
      firstName: validateName(formData.get("firstName")),
      lastName: validateName(formData.get("lastName")),
      email: validateEmail(formData.get("email")),
      password: validatePassword(formData.get("password"), formData.get("cPassword")),
      organization: validateName(formData.get("organization"))
    };

    Object.values(inputValidationResults).forEach((error) => {
      if (error) {
        throw Error("Several fields seem to have error information. Please fill them in.", { cause: inputValidationResults });
      }
    })


    const user = await findUserByEmail(formData.get("email"));
    if (user !== null) {
      throw Error("The email address is already registered. Try again with other email address");
    }

    const createdUser = await createUser(formData);
    const createdOrganization = await createOrganization(createdUser.id, formData.get("organization"));
    const createdDepartment = await createDepartment(createdOrganization.id, "__Owner");
    await createDepartmentMember(createdDepartment.id, createdUser.id, "owner");

    const userSessionData = await getUserSessionData(createdUser.email);
    setSession(userSessionData);
  } catch (e) {
    setErrorSession(e);
  }
}

export async function publishNewAnnouncement(formData) {
  validateAnnouncementForm(formData);
  const announcementData = formatAnnouncementData(formData);
  const newAnnouncement = await createAnnouncements(announcementData);

  revalidatePath("/user/dashboard/announcement");
}

function validateAnnouncementForm(formData) {
  const departmentId = formData.get("department");
  const typeTagId = formData.get("type");
  const title = formData.get("title");
  const detail = formData.get("detail");
  const expirationTime = formData.get("expirationTime");

  if (!departmentId || !typeTagId || !title || !detail || !expirationTime) {
    throw new Error("Please fill all fields and choose at least one option and department.");
  }
};

function formatAnnouncementData(formData) {
  const formattedData = [];
  const departments = formData.getAll("department");
  departments.forEach((department) => {
    const data = {
      ownerId: formData.get("userId"),
      departmentId: department,
      typeTagId: formData.get("type"),
      title: formData.get("title"),
      detail: formData.get("detail"),
      expirationTime: new Date(formData.get("expirationTime"))
    }
    formattedData.push(data);
  })
  return formattedData;
}

export async function deleteAnnouncement(formData) {
  const announcementId = formData.get("announcementId");
  await deleteAnnouncementById(announcementId);
  revalidatePath("user/dashboard/announcement");
}