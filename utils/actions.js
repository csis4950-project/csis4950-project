"use server"

import { deleteSession, encrypt, setSession } from "./session";
import {
  createDepartment,
  createDepartmentMember,
  createOrganization,
  createAnnouncements,
  createRequest,
  createShiftsFromDraft,
  createUser,
  createUserAvailability,
  deleteAnnouncementById,
  deleteUnassignedShift,
  deleteUserAvailability,
  findUserByEmail,
  getUserSessionData,
  updateRequestsWithDenyTag,
  updateRequestWithApproveTag,
  updateRequestWithCancelTag,
  updateUserOfferRequestsWithDenyTag,
  updateUserAvailability
} from "@/utils/db";
import { validateName, validateEmail, validatePassword, validateRequestInput, validateAvailabilityFormInput, validateInvitationForm, verifyName, verifyEmail, verifyPassword } from "@/utils/validation";
import { fetchIsValid } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendEmail } from "./email";


export async function login(formData) {
  const user = await findUserByEmail(formData.get("email"));
  if (user === null) {
    throw new Error("User does not exist or the password provided is incorrect");
  }

  if (!await fetchIsValid(formData.get("password"), user.password)) {
    throw new Error("User does not exist or the password provided is incorrect");
  }

  const userSessionData = await getUserSessionData(user.email);
  await setSession(userSessionData);

  redirect("/user/dashboard", "replace");
}

export async function logout() {
  await deleteSession();
  redirect("/login", "replace");
}

export async function signUpOwner(formData) {
  const inputValidationResults = {
    firstName: validateName(formData.get("firstName")),
    lastName: validateName(formData.get("lastName")),
    email: validateEmail(formData.get("email")),
    password: validatePassword(formData.get("password"), formData.get("cPassword")),
    organization: validateName(formData.get("organization"))
  };

  Object.values(inputValidationResults).forEach((error) => {
    if (error) {
      const error = {
        message: "Several fields seem to have error information. Please fill them in.",
        cause: inputValidationResults
      }
      throw new Error(JSON.stringify(error));
    }
  })


  const user = await findUserByEmail(formData.get("email"));
  if (user !== null) {
    const error = {
      message: "The email address is already registered. Try again with other email address",
      cause: {}
    }
    throw new Error(JSON.stringify(error));
  }

  const createdUser = await createUser(formData);
  const createdOrganization = await createOrganization(createdUser.id, formData.get("organization"));
  const createdDepartment = await createDepartment(createdOrganization.id, "__Owner");
  await createDepartmentMember(createdDepartment.id, createdUser.id, "owner");

  const userSessionData = await getUserSessionData(createdUser.email);
  await setSession(userSessionData);

  redirect("/user/dashboard", "replace");
}

export async function signUpUser(formData) {
  const userInput = {
    departmentId: formData.get("departmentId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    cPassword: formData.get("cPassword")
  };

  verifyName(userInput.firstName);
  verifyName(userInput.lastName);
  verifyEmail(userInput.email);
  verifyPassword(userInput.password, userInput.cPassword);

  const user = await findUserByEmail(userInput.email);
  if (user !== null) {
    throw new Error("The email address is already registered. Try again with other email address or login with your account");
  }

  const createdUser = await createUser(formData);
  await createDepartmentMember(userInput.departmentId, createdUser.id);

  const userSessionData = await getUserSessionData(createdUser.email);
  await setSession(userSessionData);

  redirect("/user/dashboard", "replace");
}

export async function signUpUserWithExistingAccount(formData) {
  const userInput = {
    departmentId: formData.get("departmentId"),
    email: formData.get("email"),
    password: formData.get("password")
  };

  const user = await findUserByEmail(userInput.email);
  if (user === null) {
    throw new Error("User not found. Please double-check your email or consider signing up if you're new");
  }

  await createDepartmentMember(userInput.departmentId, user.id);

  const userSessionData = await getUserSessionData(user.email);
  await setSession(userSessionData);

  redirect("/user/dashboard", "replace");
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

export async function submitRequest(formData) {
  const userInput = {
    userId: formData.get("userId"),
    department: formData.get("department"),
    type: formData.get("type"),
    typeName: formData.get("typeName"),
    shift: formData.get("shift"),
    startDate: formData.get("startDate"),
    startTime: formData.get("startTime"),
    endDate: formData.get("endDate"),
    endTime: formData.get("endTime"),
    detail: formData.get("detail")
  }

  validateRequestInput(userInput);
  await createRequest(userInput);

  revalidatePath("/user/dashboard/request");
}

export async function approveRequest(formData) {
  const requestId = formData.get("requestId");
  const updatedRequest = await updateRequestWithApproveTag(requestId);

  revalidatePath("/user/dashboard/request");
}

export async function denyRequest(formData) {
  const requestId = formData.get("requestId");
  const updatedRequest = await updateRequestsWithDenyTag(requestId);

  revalidatePath("/user/dashboard/request");
}

export async function cancelRequest(formData) {
  const requestId = formData.get("requestId");
  const updatedRequest = await updateRequestWithCancelTag(requestId);
  const deletedUnassignedShift = await deleteUnassignedShift(requestId);
  const deniedOfferUserRequests = await updateUserOfferRequestsWithDenyTag(requestId);

  revalidatePath("/user/dashboard/request");
}

export async function submitAvailability(formData) {
  const userInput = {
    userId: formData.get("userId"),
    selectedDayOfWeek: formData.get("selectedDayOfWeek"),
    dayOfWeekTagId: formData.get("dayOfWeekId"),
    availabilityOfDayOfWeek: formData.get("availabilityOfDayOfWeek"),
    startTime: formData.get("startTime") !== "" ? formData.get("startTime") : null,
    endTime: formData.get("endTime") !== "" ? formData.get("endTime") : null,
    note: formData.get("note") !== "" ? formData.get("note") : null
  }
  validateAvailabilityFormInput(userInput);

  if (userInput.availabilityOfDayOfWeek === "no-data" || userInput.selectedDayOfWeek === "Other") {
    const availability = await createUserAvailability(userInput);
  } else {
    const availability = await updateUserAvailability(userInput);
  }

  revalidatePath("/user/dashboard/edit-availability");
}

export async function deleteAvailability(formData) {
  if (formData.get("availabilityId") === "no-data") return;
  const availability = await deleteUserAvailability(formData.get("availabilityId"));

  revalidatePath("/user/dashboard/availability");
}

export async function submitCreateDepartmentForm(formData) {
  const orgId = formData.get("orgId");
  const departmentName = formData.get("name");
  validateName(departmentName);

  const createdDepartment = await createDepartment(orgId, departmentName);
  revalidatePath("/user/departments");
}

export async function sendInvitation(formData) {
  const invitationData = {
    organizationId: formData.get("organizationId"),
    organization: formData.get("organization"),
    departmentId: formData.get("departmentId"),
    department: formData.get("department"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email")
  }
  validateInvitationForm(invitationData.firstName, invitationData.lastName, invitationData.email);

  const subject = "Wehabu: Invitation Link"
  const payload = await encrypt(invitationData);
  const invitationLink = process.env.URL + `/user-registration?payload=${payload}`;
  const message =
    `Hello ${invitationData.firstName} ${invitationData.lastName},\n
    You've been invited by ${invitationData.organization} to join ${invitationData.department}. Please complete your registration within 24 hours by following the link below to use Wehabu platform. If you already have an account, click "Sign up with an existing account" on the linked page.\n
    \n
    ${invitationLink}\n
    \n
    Wehabu`;

  sendEmail(invitationData.email, subject, message);
}

export async function submitScheduleDraft(formDate) {
  try {
    const draft = JSON.parse(formDate.get("newShiftData"))
    const newShifts = await createShiftsFromDraft(draft);
  } catch (e) {
    throw new Error("There's something wrong. Please try later.")
  }

  redirect("/user/calendar");
}