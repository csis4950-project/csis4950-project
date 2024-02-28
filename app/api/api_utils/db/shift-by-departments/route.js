import { createResponse } from "@/app/api/api_utils/createResponse";
import { getShiftsByUserDepartments } from '@/utils/db';

export async function POST(request, response) {
  try {
    const { departments } = await request.json();
    const shifts = await getShiftsByUserDepartments(departments);

    return createResponse(shifts, "success");
  } catch (e) {
    console.log(e);
    return createResponse(e);
  }
}