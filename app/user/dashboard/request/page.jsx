import { getTagsByTagType, getShiftsByUserId, getRequestsOfAffiliatedDepartments } from "@/utils/db";
import { getSession } from "@/utils/session";
import RequestForm from "./RequestForm";
import moment from "moment";

export default async function Request() {
  const { payload: session } = await getSession();
  const { userId, currentOrganization, departments } = session;
  const requestTypes = await getTagsByTagType("request");
  const { isOwner, userRoleDepartments, userRoleDepartmentIds } = getUserRoleDepartments(departments);
  const shifts = await getShiftsByUserId(userId);
  const requests = await getRequestsOfAffiliatedDepartments(currentOrganization, departments);

  // 

  // fetch by departments
  // style the table
  // move contents into components
  // add server action for making request, approve or deny

  // console.log('requests', requests.length);

  return (
    <section className="request">
      <div className="request__head">
        <h3>Requests</h3>
      </div>
      <RequestForm userId={userId} departments={departments} requestTypes={requestTypes} shifts={shifts} />
      <div>
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
                const { detail, createdAt, requestType, requestOwner, requestDepartment, status } = request;
                return (
                  <tr key={index} className="table__row table__row--size-body">
                    <td className="table__cel">{index}</td>
                    <td className="table__cel">{moment(createdAt).format("MM/DD")}</td>
                    <td className="table__cel">{requestType.name}</td>
                    <td className="table__cel">{`${requestOwner.firstName} ${requestOwner.lastName}`}</td>
                    <td className="table__cel">{requestDepartment.name}</td>
                    <td className="table__cel">{detail + " " + status.name}</td>
                    {isOwner
                      ?
                      status.name === "pending"
                        ?
                        <td className="table__cel">
                          <div>
                            <button>Approve</button>
                          </div>
                          <div>
                            <button>Deny</button>
                          </div>
                        </td>
                        :
                        <td>{status.name}</td>
                      : <></>
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </section >
  )
}

function getUserRoleDepartments(departments) {

  let isOwner = false;
  let userRoleDepartments = [];
  let userRoleDepartmentIds = [];

  for (const department of departments) {
    if (department.role === "owner") {
      isOwner = true;
      userRoleDepartments = [];
      userRoleDepartmentIds = [];
      break;
    }
    if (department.role === "user") {
      userRoleDepartments.push(department);
      userRoleDepartmentIds.push(department.departmentId);
    }
  }

  return {
    isOwner: isOwner,
    userRoleDepartments: userRoleDepartments,
    userRoleDepartmentIds: userRoleDepartmentIds
  };
}