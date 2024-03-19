import { getTagsByTagType, getShiftsByUserId, getRequestsOfAffiliatedDepartments, checkIfOwner } from "@/utils/db";
import { getSession } from "@/utils/session";
import RequestForm from "./RequestForm";
import ProcessedRequestList from "./ProcessedRequestList";
import PendingRequestList from "./PendingRequestList";

export default async function Request() {
  const { payload: session } = await getSession();
  const { userId, currentOrganization, departments } = session;
  const requestTypes = await getTagsByTagType("request");
  const userShifts = await getShiftsByUserId(userId);
  const requests = await getRequestsOfAffiliatedDepartments(currentOrganization, departments, userId);

  return (
    <section className="request">
      <div className="request__head">
        <h3>Requests</h3>
      </div>
      <RequestForm requests={requests} userId={userId} departments={departments} requestTypes={requestTypes} userShifts={userShifts} />
      <PendingRequestList requests={requests} />
      <ProcessedRequestList requests={requests} />
    </section >
  )
}