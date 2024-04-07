import { getTagsByTagType, getAnnouncementsOfAffiliatedDepartments } from "@/utils/db";
import { getSession } from "@/utils/session"
import moment from "moment";
import AnnouncementForm from "./AnnouncementForm";
import DeleteButton from "./DeleteButton";
import { icons } from "@/utils/icons";
import { hasOwnerPermission } from "@/utils/utils";

export default async function Announcement() {
  const { payload: session } = await getSession();
  const { userId, currentOrganization, departments } = session;
  const announcementTypes = await getTagsByTagType("announcement");
  const announcements = await getAnnouncementsOfAffiliatedDepartments(currentOrganization, departments);
  const isOwner = hasOwnerPermission(departments);
  const adminRoleDepartments = getAdminRoleDepartments(departments, isOwner);

  return (
    <section className="announcement">
      <div className="announcement__head">
        <h3>Announcements</h3>
      </div>
      {
        adminRoleDepartments.length
        && <AnnouncementForm userId={userId} departments={adminRoleDepartments} announcementTypes={announcementTypes} />
      }
      <h4>Announcements</h4>
      <div className="overflow-y">
        <table className="table">
          <thead>
            <tr className="table__row table__row--size-head">
              <th>Published<br /> Date</th>
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
                const adjustedExpirationTime = moment(expirationTime).add(8, 'hours');
                const isExpired = isExpiredAnnouncement(adjustedExpirationTime);
                const announcedDepartmentIds = getAdminRoleDepartmentIds(adminRoleDepartments);
                if (!isExpired) {

                  return (
                    <tr key={index} className="table__row table__row--size-body">
                      <td className="table__cel table__cel--small">{moment(createdAt).format("MM/DD")}</td>
                      <td className="table__cel table__cel--medium">{announcedDepartment.name}</td>
                      <td className="table__cel table__cel--small">
                        <div>
                          <div>{icons[announcementType.name]}</div><div>{announcementType.name}</div>
                        </div>
                      </td>
                      <td className="table__cel table__cel--medium">{title}</td>
                      <td className="table__cel table__cel--large">{detail}</td>
                      <td className="table__cel table__cel--small">{adjustedExpirationTime.format("MM/DD")}</td>
                      {(isOwner || announcedDepartmentIds.includes(announcedDepartment.id))
                        && <td className="table__cel">
                          <DeleteButton announcementId={announcementId} />
                        </td>
                      }
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </table>
      </div>
      <h4>Expired Announcements</h4>
      <div className="overflow-y">
        <table className="table">
          <thead>
            <tr className="table__row table__row--size-head">
              <th>Published<br /> Date</th>
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
                const adjustedExpirationTime = moment(expirationTime).add(8, 'hours');
                const isExpired = isExpiredAnnouncement(adjustedExpirationTime);
                const announcedDepartmentIds = getAdminRoleDepartmentIds(adminRoleDepartments);
                if (isExpired) {
                  return (
                    <tr key={index} className="table__row table__row--size-body">
                      <td className="table__cel table__cel--small">{moment(createdAt).format("MM/DD")}</td>
                      <td className="table__cel table__cel--medium">{announcedDepartment.name}</td>
                      <td className="table__cel table__cel--small">
                        <div>
                          <div>{icons[announcementType.name]}</div><div>{announcementType.name}</div>
                        </div>
                      </td>
                      <td className="table__cel table__cel--medium">{title}</td>
                      <td className="table__cel table__cel--large">{detail}</td>
                      <td className="table__cel table__cel--small">{adjustedExpirationTime.format("MM/DD")}</td>
                      {(isOwner || announcedDepartmentIds.includes(announcedDepartment.id))
                        && <td className="table__cel">
                          <DeleteButton announcementId={announcementId} />
                        </td>
                      }
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </table>
      </div>
    </section >
  )
}

function getAdminRoleDepartments(departments, isOwner = false) {
  return departments.filter((department) => isOwner || department.role === "admin");
}

function getAdminRoleDepartmentIds(departments) {
  return departments.map(department => department.id);
};

function isExpiredAnnouncement(expirationTime) {
  const now = moment().startOf('days');
  return now.isAfter(expirationTime);
}