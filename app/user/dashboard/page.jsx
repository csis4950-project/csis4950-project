import Link from "next/link";
import { announceData, availabilities } from "@/data/testData";
import { getSession } from "@/utils/session";
import { getAnnouncementsOfAffiliatedDepartments } from "@/utils/db";
import AnnouncementFrame from "./AnnouncementFrame";

export default async function Dashboard() {
  const { payload: session } = await getSession();
  const { currentOrganization, departments } = session;
  const announcements = await getAnnouncementsOfAffiliatedDepartments(currentOrganization, departments);
  const userRoles = getUserRoles(currentOrganization, departments);;

  return (
    <section className="dashboard">
      <div className="header">
        <div className="header__title">
          <h3>Dashboard</h3>
        </div>
        <div className="button-group">
          {userRoles.includes("admin") && <button className="btn btn--invitation-link">Create Invitation Link</button>}
          {userRoles.includes("user") && <button className="btn btn--invitation-link">Create Report</button>}
        </div>
      </div>
      <AnnouncementFrame announcements={announcements} />
      <div className="request-status p__v12h24">
        <div className="frame">
          <h4>Request Status</h4>
          <ul className="list">
            {
              announceData.map((data, index) => {
                return (
                  <li key={index} className="list__item">
                    <p>{data.tag}: {new Date(data.date).toLocaleDateString()}...{data.description}</p>
                  </li>
                )
              })
            }
          </ul>
          <div className="btn btn--show-all">
            <Link className="btn--show-all__text" href="/user/dashboard/request">SHOW ALL</Link>
          </div>
        </div>
      </div>
      <div className="availability p__v12h0">
        <div className="frame frame--vertical">
          <h4>Availability</h4>
          <ul>
            {
              availabilities.map((availability, index) => {
                const day = Object.keys(availability)[0]
                return (
                  <li key={index}>
                    <span>{day[0].toUpperCase() + day.slice(1)}: {availability[day]}</span>
                  </li>
                )
              })
            }
          </ul>
          <span><b>NOTES</b></span>
          <ul>
            <li><span>2/22: not available</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function getUserRoles(currentOrganization, departments) {
  const roles = new Set();
  departments.forEach((department) => {
    if (currentOrganization.id === department.organizationId) {
      roles.add(department.role);
    }
  })

  return Array.from(roles);
}