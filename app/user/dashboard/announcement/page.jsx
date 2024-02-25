import { getTagsByTagType, getAnnouncementsOfAffiliatedDepartments } from "@/utils/db";
import { getSession } from "@/utils/session"
import moment from "moment";
import AnnouncementForm from "./AnnouncementForm";
import DeleteButton from "./DeleteButton";

export default async function Announcement() {
  const { payload: session } = await getSession();
  const { currentOrganization, departments } = session;
  const announcementTypes = await getTagsByTagType("announcement");
  const announcements = await getAnnouncementsOfAffiliatedDepartments(currentOrganization, departments);

  return (
    <section className="announcement">
      <div className="announcement__head">
        <h3>Announcements</h3>
      </div>
      <AnnouncementForm session={session} announcementTypes={announcementTypes} />
      <div>
        <table className="table">
          <thead>
            <tr className="table__row table__row--size-head">
              <th className="table__cel">No.</th>
              <th>Published Date</th>
              <th>Type</th>
              <th>Title</th>
              <th>Detail</th>
              <th>Expire At</th>
            </tr>
          </thead>
          <tbody>
            {
              announcements.map((announcement, index) => {
                const { id: announcementId, title, detail, createdAt, announcementType, expirationTime } = announcement;
                const isExpired = isNotExpiredAnnouncement(expirationTime);
                return (
                  <tr key={index} className="table__row table__row--size-body">
                    <td className="table__cel">{index}</td>
                    <td className="table__cel">{moment(createdAt).format("MM/DD")}</td>
                    <td className="table__cel">{announcementType.name}</td>
                    <td className="table__cel">{title}</td>
                    <td className="table__cel">{detail}</td>
                    {isExpired ? <td className="table__cel">{moment(expirationTime).format("MM/DD")}</td> : <td className="table__cel">EXPIRED</td>}
                    <td className="table__cel">
                      <DeleteButton announcementId={announcementId} />
                    </td>
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

function isExpiredAnnouncement(expirationTime) {
  const now = moment().utcOffset(-8);
  return moment(expirationTime).isSameOrBefore(now);
}

function isNotExpiredAnnouncement(expirationTime) {
  return !isExpiredAnnouncement(expirationTime);
}
