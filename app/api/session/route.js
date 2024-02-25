import { createResponse } from "@/app/api/api_utils/createResponse";
import { getSession } from "@/utils/session";

export async function POST() {
  try {
    const session = await getSession();
    return createResponse(session, "success");
  } catch (e) {
    return createResponse(e);
  }
}