import { getTagsByTagType, getShiftsByUserId, getRequestsOfAffiliatedDepartments, checkIfOwner } from "@/utils/db";
import { getSession } from "@/utils/session";
import RequestForm from "./RequestForm";
import moment from "moment";
import DenyButton from "./DenyButton";
import ApproveButton from "./ApproveButton";
import CancelButton from "./CancelButton";

export default async function Request() {
  const { payload: session } = await getSession();
  const { userId, currentOrganization, departments } = session;
  const requestTypes = await getTagsByTagType("request");
  const isOwner = checkIfOwner(currentOrganization.id, userId);
  const userShifts = await getShiftsByUserId(userId);
  const requests = await getRequestsOfAffiliatedDepartments(currentOrganization, departments);

  return (
    <section className="request">
      <div className="request__head">
        <h3>Requests</h3>
      </div>
      <RequestForm requests={requests} userId={userId} departments={departments} requestTypes={requestTypes} userShifts={userShifts} />
      {
        isOwner && <PendingRequestList requests={requests} />
      }
      <ProcessedRequestList requests={requests} />
    </section >
  )
}

async function PendingRequestList({ requests }) {
  return (
    <div className="request__container">
      <h4>Pending Requests</h4>
      <table className="table">
        <thead>
          <tr className="table__row table__row--size-head">
            <th>No.</th>
            <th>Requested Date</th>
            <th>Type</th>
            <th>From</th>
            <th>Department</th>
            <th>Detail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            requests.map((request, index) => {
              const { id, detail, createdAt, requestType, requestOwner, requestDepartment, shiftRequest, status } = request;
              if (!requestDepartment.name.startsWith("__") && status.name === "pending") {
                return (
                  <tr key={index} className="table__row table__row--size-body">
                    <td className="table__cel">{index}</td>
                    <td className="table__cel table__cel--date">{moment(createdAt).format("MM/DD")}</td>
                    <td className="table__cel">{requestType.name}</td>
                    <td className="table__cel">{`${requestOwner.firstName} ${requestOwner.lastName}`}</td>
                    <td className="table__cel">{requestDepartment.name}</td>
                    <td className="table__cel"><div className="table__cel--detail"><span>{`department: ${shiftRequest?.shiftDepartment.name} | status: ${status.name} | shiftId: ${shiftRequest?.id}`}</span></div></td>
                    <td className="table__cel">
                      {requestType.name === "offer-admin" && <CancelButton requestId={id} />}
                      {requestType.name !== "offer-admin" && <ApproveButton requestId={id} />}
                      {requestType.name !== "offer-admin" && <DenyButton requestId={id} />}
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </div>
  )
}

function ProcessedRequestList({ requests }) {
  return (
    <div>
      <h4>Processed Requests</h4>
      <table className="table">
        <thead>
          <tr className="table__row table__row--size-head">
            <th>No.</th>
            <th>Requested Date</th>
            <th>Type</th>
            <th>From</th>
            <th>Department</th>
            <th>Detail</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            requests.map((request, index) => {
              const { id, detail, createdAt, requestType, requestOwner, requestDepartment, status } = request;
              if (!requestDepartment.name.startsWith("__") && status.name !== "pending") {
                return (
                  <tr key={index} className="table__row table__row--size-body">
                    <td className="table__cel">{index}</td>
                    <td className="table__cel table__cel--date">{moment(createdAt).format("MM/DD")}</td>
                    <td className="table__cel">{requestType.name}</td>
                    <td className="table__cel">{`${requestOwner.firstName} ${requestOwner.lastName}`}</td>
                    <td className="table__cel">{requestDepartment.name}</td>
                    <td className="table__cel"><div className="table__cel--detail"><span>{`${detail} | status: ${status.name}`}</span></div></td>
                    <td className="table__cel">
                      <div>
                        {status.name === "denied" && <span className="form__text--error-message">{status.name}</span>}
                        {status.name === "approved" && <span className="form__text--success-message">{status.name}</span>}
                        {status.name === "canceled" && <span className="form__text--canceled">{status.name}</span>}
                      </div>
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </div>
  )
}