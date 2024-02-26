import bcrypt from "bcrypt";
import { createResponse } from "@/app/api/api_utils/createResponse";

export async function POST(request, response) {
  try {
    const { action, payload } = await request.json();
    if (action === "isValid") {
      const result = await isValidPassword(payload.password, payload.encryptedPassword)
      return createResponse(result, "success");
    }

    if (action === "hash") {
      const result = await hashPassword(payload.password);
      return createResponse(result, "success");
    }
  } catch (e) {
    return createResponse(e);
  }
}



async function isValidPassword(password, encryptedPassword) {
  return await bcrypt.compare(password, encryptedPassword);
}

async function hashPassword(password) {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
}