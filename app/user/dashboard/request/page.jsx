import { getTagsByTagType, getShiftsByUserId, getRequestsOfAffiliatedDepartments } from "@/utils/db";
import { getSession } from "@/utils/session";
import RequestForm from "./RequestForm";
import ProcessedRequestList from "./ProcessedRequestList";
import PendingRequestList from "./PendingRequestList";
import { getManageableDepartments } from "@/utils/utils";

export default async function Request() {
  const { payload: session } = await getSession();
  const { userId, currentOrganization, departments } = session;
  const requestTypes = await getTagsByTagType("request");
  const userShifts = await getShiftsByUserId(userId);
  const requests = await getRequestsOfAffiliatedDepartments(currentOrganization, departments, userId);
  const manageableDepartments = getManageableDepartments(session.departments);

  requests.forEach(a => console.log('a', a.requestDepartment.name))
  return (
    <section className="request">
      <div className="request__head">
        <h3>Requests</h3>
      </div>
      <RequestForm requests={requests} userId={userId} departments={departments} manageableDepartments={manageableDepartments} requestTypes={requestTypes} userShifts={userShifts} />
      <PendingRequestList requests={requests} />
      <ProcessedRequestList requests={requests} />
    </section >
  )
}