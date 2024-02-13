"use server"
import prismaClient from "@/utils/globalPrismaClient";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { encrypt, decrypt, createPayload } from "@/utils/utils";



export async function login(prevState, formData) {
  try {
    const user = await findUserByEmail(formData.get("email"));
    if (user === null) {
      throw new Error("user does not exist or password not match");
    }

    const isValidPassword = await bcrypt.compare(formData.get("password"), user.password);
    if (!isValidPassword) {
      throw new Error("user does not exist or password not match");
    }

    setUserToCookie(user);

    return { message: "" }
  } catch (e) {
    console.log(e);
    return { message: "e" }
  }
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function signUp(formData) {
  console.log(formData);
  try {
    const isValidPassword = await formData.get("password").match(formData.get("cPassword"));
    if (!isValidPassword) {
      throw Error("Password not match");
    }

    const user = await findUserByEmail(formData.get("email"));
    if (user !== null) {
      throw Error("The email address is already registered. Try again with other email address");
    }

    const createdUser = await createUser(formData);
    const createdOrganization = await createOrganization(createdUser.id, formData.get("organization"));
    const createdDepartment = await createDepartment(createdOrganization.id, formData.get("department"));

    // create jwt
    const payload = await createPayload(createdUser);
    const expires = new Date(Date.now() + (24 * 60 * 60 * 1000));
    const session = await encrypt({ payload, expires });

    cookies().set("session", session, { expires, httpOnly: true });
  } catch (e) {
    console.log(e);
  }
}

export async function findUserByEmail(email) {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email
    }
  })

  return user;
}

export async function createUser(formData) {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(formData.get("password"), saltRound);

  const newUser = await prismaClient.user.create({
    data: {
      firstName: formData.get("fName"),
      lastName: formData.get("lName"),
      email: formData.get("email"),
      password: hashedPassword
    }
  })

  return newUser;
}

export async function createOrganization(userId, organizationName) {
  const organization = await prismaClient.organization.create({
    data: {
      "ownerId": userId,
      "name": organizationName
    }
  })

  return organization;
}

export async function createDepartment(organizationId, departmentName) {
  const department = await prismaClient.department.create({
    data: {
      "organizationId": organizationId,
      "name": departmentName
    }
  })
  return department;
}


