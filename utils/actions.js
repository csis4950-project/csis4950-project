import { isValidPassword } from "@/utils/utils";
import { deleteSession, setErrorSession, setSession } from "./session";
import { findUserByEmail, createUser, createOrganization, createDepartment, createDepartmentMember } from "@/utils/db";
import { validateName, validateEmail, validatePassword } from "@/utils/validation";


export async function login(formData) {
  try {
    const user = await findUserByEmail(formData.get("email"));
    if (user === null) {
      throw new Error("User does not exist or the password provided is incorrect");
    }

    if (!await isValidPassword(formData.get("password"), user.password)) {
      throw new Error("User does not exist or the password provided is incorrect");
    }

    setSession(user);
  } catch (e) {
    setErrorSession(e);
  }
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

    setSession(createdUser);
  } catch (e) {
    setErrorSession(e);
  }
}