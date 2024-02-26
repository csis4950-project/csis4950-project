import { getTagsByTagType, getAnnouncementsOfAffiliatedDepartments } from "@/utils/db";
import { getSession } from "@/utils/session"
import moment from "moment";
import AnnouncementForm from "./AnnouncementForm";
import DeleteButton from "./DeleteButton";

export default async function Announcement() {
  const { payload: session } = await getSession();
  const { userId, currentOrganization, departments } = session;
  const announcementTypes = await getTagsByTagType("announcement");
  const announcements = await getAnnouncementsOfAffiliatedDepartments(currentOrganization, departments);
  const { isOwner, adminRoleDepartments, adminRoleDepartmentIds } = getAdminRoleDepartments(session.departments);

  return (
    <section className="announcement">
      <div className="announcement__head">
        <h3>Announcements</h3>
      </div>
      {
        adminRoleDepartments.length
        && <AnnouncementForm userId={userId} departments={adminRoleDepartments} announcementTypes={announcementTypes} />}
      <div>
        <table className="table">
          <thead>
            <tr className="table__row table__row--size-head">
              <th>No.</th>
              <th>Published Date</th>
              <th>Department</th>
              <th>Type</th>
              <th>Title</th>
              <th>Detail</th>
              <th>Expire At</th>
            </tr>
          </thead>
          <tbody>
            {
              announcements.map((announcement, index) => {
                const { announcedDepartment, id: announcementId, title, detail, createdAt, announcementType, expirationTime } = announcement;
                const isExpired = isNotExpiredAnnouncement(expirationTime);
                return (
                  <tr key={index} className="table__row table__row--size-body">
                    <td className="table__cel">{index + 1}</td>
                    <td className="table__cel">{moment(createdAt).format("MM/DD")}</td>
                    <td className="table__cel">{announcedDepartment.name}</td>
                    <td className="table__cel">{announcementType.name}</td>
                    <td className="table__cel">{title}</td>
                    <td className="table__cel">{detail}</td>
                    {isExpired ? <td className="table__cel">{moment(expirationTime).format("MM/DD")}</td> : <td className="table__cel">EXPIRED</td>}
                    {(isOwner || adminRoleDepartmentIds.includes(announcedDepartment.id))
                      && <td className="table__cel">
                        <DeleteButton announcementId={announcementId} />
                      </td>
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

function getAdminRoleDepartments(departments) {
  let isOwner = false;
  const adminRoleDepartments = [];
  const adminRoleDepartmentIds = [];

  for (const department of departments) {
    if (department.role === "owner") {
      isOwner = true;
    }
    if (department.role === "admin" || isOwner) {
      adminRoleDepartments.push(department);
      adminRoleDepartmentIds.push(department.departmentId);
    }
  }

  return {
    isOwner: isOwner,
    adminRoleDepartments: adminRoleDepartments,
    adminRoleDepartmentIds: adminRoleDepartmentIds
  };
}

function isExpiredAnnouncement(expirationTime) {
  const now = moment().utcOffset(-8);
  return moment(expirationTime).isSameOrBefore(now);
}

function isNotExpiredAnnouncement(expirationTime) {
  return !isExpiredAnnouncement(expirationTime);
}
