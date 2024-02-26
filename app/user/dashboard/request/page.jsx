import { getTagsByTagType, getAnnouncementsOfAffiliatedDepartments, getShiftsByUserId } from "@/utils/db";
import { getSession } from "@/utils/session"
import moment from "moment";

export default async function Request() {
  const { payload: session } = await getSession();
  const { userId, currentOrganization, departments } = session;
  const requestTypes = await getTagsByTagType("request");
  const { isOwner, userRoleDepartments, userRoleDepartmentIds } = getUserRoleDepartments(departments);
  const shifts = await getShiftsByUserId(userId);

  return (
    <section className="request">
      <div className="request__head">
        <h3>Requests</h3>
      </div>
      <form className="form">
        <div className="form__group">
          <div>
            <label className="form__label" htmlFor="department">Department:</label>
            <select id="department" name="department" >
              <option value="">Select a department</option>
              {
                departments.map(({ departmentId, departmentName }, index) => {
                  if (!departmentName.startsWith("__")) {
                    return (
                      <option key={index} value={departmentId}>{departmentName}</option>
                    )
                  }
                })
              }
            </select>
            {/* {departments.map(({ departmentId, departmentName }, index) => {
              // {userRoleDepartments.map(({ departmentId, departmentName }, index) => {
              if (!departmentName.startsWith("__")) {
                return (
                  <>
                    <div key={index}>
                      <input type="checkbox" name="department" value={departmentId} />
                      <label>{departmentName}</label>
                    </div>
                  </>
                )
              }
            })} */}
          </div>
        </div>
        <div className="form__group">
          <div>
            <label className="form__label" htmlFor="type">Type:</label>
            <select id="type" name="type" >
              <option value="">Select an option</option>
              {
                requestTypes.map(({ id, name }, index) => {
                  return (
                    <option key={index} value={id}>{name}</option>
                  )
                })
              }
            </select>
          </div>
          <div>
            <label className="form__label" htmlFor="type">Shift:</label>
            <select id="type" name="type" >
              <option value="">Select a shift</option>
              {
                shifts.map(({ id, startTime, endTime, shiftTag }, index) => {
                  const startDateString = new Date(startTime).toLocaleDateString();
                  const startTimeString = new Date(startTime).toLocaleTimeString();
                  const endTimeString = new Date(endTime).toLocaleTimeString();
                  const shiftString = `${startDateString}: ${shiftTag.name} <${startTimeString} - ${endTimeString}>`;

                  return (
                    <option key={index} value={id}>{shiftString}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <div className="form__group">
          <div>
            <div>
              <label className="form__label" htmlFor="startDate">Start Date:</label>
              <input id="startDate" type="date" name="startDate" />
            </div>
            <div>
              <label className="form__label" htmlFor="startTime">Start Time:</label>
              <input id="startTime" type="time" name="startTime" />
            </div>
          </div>
          <div>
            <div>
              <label className="form__label" htmlFor="endDate">End Date:</label>
              <input id="endDate" type="date" name="endDate" />
            </div>
            <div>
              <label className="form__label" htmlFor="endTime">End Time:</label>
              <input id="endTime" type="time" name="endTime" />
            </div>
          </div>
        </div>
        <div className="form__detail">
          <label className="form__label" htmlFor="detail">Detail:</label>
          <textarea id="detail" className="form__detail--size" type="text" name="detail"></textarea>
        </div>
        {/* activate after move into client component */}
        {/* {error && <span className="form__text--error-message">{ERROR_MESSAGE}</span>} */}
        <input type="hidden" name="userId" value={userId} />
        <button className="form__btn" type="submit">Submit</button>
      </form>
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
            <tr className="table__row table__row--size-body">
              <td className="table__cel">1</td>
              <td className="table__cel">3/1</td>
              <td className="table__cel">Cancel</td>
              <td className="table__cel">User1</td>
              <td className="table__cel">Department1</td>
              <td className="table__cel">
                <p>3/2: morning 8:00 - 16:00</p>
                <p>Exam</p>
              </td>
              <td className="table__cel">
                <div>
                  <button>Approve</button>
                </div>
                <div>
                  <button>Deny</button>
                </div>
              </td>
            </tr>
            {/* {
            announcements.map((announcement, index) => {
              const { announcedDepartment, id: announcementId, title, detail, createdAt, announcementType, expirationTime } = announcement;
              const isExpired = isNotExpiredAnnouncement(expirationTime);
              return (
                <tr key={index} className="table__row table__row--size-body">
                  <td className="table__cel">{index}</td>
                  <td className="table__cel">{moment(createdAt).format("MM/DD")}</td>
                  <td className="table__cel">{announcedDepartment.name}</td>
                  <td className="table__cel">{announcementType.name}</td>
                  <td className="table__cel">{title}</td>
                  <td className="table__cel">{detail}</td>
                  {isExpired ? <td className="table__cel">{moment(expirationTime).format("MM/DD")}</td> : <td className="table__cel">EXPIRED</td>}
                  {(adminDepartments.isOwner || adminDepartments.departmentIds.includes(announcedDepartment.id))
                    && <td className="table__cel">
                      <DeleteButton announcementId={announcementId} />
                    </td>
                  }
                </tr>
              )
            })
          } */}
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