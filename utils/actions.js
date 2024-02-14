import { cookies } from "next/headers";
import { encrypt, createPayload, isValidPassword, matchPassword } from "@/utils/utils";

export async function login(prevState, formData) {
  try {
    const user = await findUserByEmail(formData.get("email"));
    if (user === null) {
      throw new Error("user does not exist or password not match");
    }

    if (await !isValidPassword(formData.get("password"), user.password)) {
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
  try {
    if (!matchPassword(formData.get("password"), formData.get("cPassword"))) {
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