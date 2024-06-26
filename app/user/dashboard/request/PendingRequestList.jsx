import moment from "moment";
import DenyButton from "./DenyButton";
import ApproveButton from "./ApproveButton";
import CancelButton from "./CancelButton";
import { icons } from "@/utils/icons";

export default async function PendingRequestList({ requests }) {
  return (
    <div className="request__container">
      <h4>Pending Requests</h4>
      <div className="overflow-y">
        <table className="table">
          <thead>
            <tr className="table__row table__row--size-head">
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
                const fullName = `${requestOwner.firstName} ${requestOwner.lastName}`;
                return status.name === "pending" && (
                  <tr key={index} className="table__row table__row--size-body">
                    <td className="table__cel table__cel--small">{moment(createdAt).format("MM/DD")}</td>
                    <td className="table__cel table__cel--small">
                      <div className="icon">
                        <div>{icons[requestType.name]}</div><div>{requestType.name}</div>
                      </div>
                    </td>
                    <td className="table__cel table__cel--medium">{`${fullName}`}</td>
                    <td className="table__cel table__cel--medium">{requestDepartment.name}</td>
                    <td className="table__cel table__cel--large">{detail}</td>
                    <td className="table__cel">
                      {requestType.name === "offer-admin" && <CancelButton requestId={id} />}
                      {requestType.name !== "offer-admin" && <ApproveButton requestId={id} />}
                      {requestType.name !== "offer-admin" && <DenyButton requestId={id} />}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}