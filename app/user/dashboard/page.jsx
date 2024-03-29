import { getSession } from "@/utils/session";
import { getAnnouncementsOfAffiliatedDepartments, getRequestsOfAffiliatedDepartments, getAvailabilitiesByUserId, getDayOfWeekTags } from "@/utils/db";
import { sortAvailabilitiesByDayOfWeek, sortDayOfWeekTags } from "@/utils/utils";
import AnnouncementFrame from "./AnnouncementFrame";
import RequestFrame from "./RequestFrame";
import AvailabilityFrame from "./AvailabilityFrame";

export default async function Dashboard() {
  const { payload: session } = await getSession();
  const { currentOrganization, departments } = session;
  const announcements = await getAnnouncementsOfAffiliatedDepartments(currentOrganization, departments);
  const requests = await getRequestsOfAffiliatedDepartments(currentOrganization, departments);
  const userRoles = getUserRoles(currentOrganization, departments);
  let availabilities = await getAvailabilitiesByUserId(session.userId);
  availabilities = sortAvailabilitiesByDayOfWeek(availabilities);
  let dayOfWeekTags = await getDayOfWeekTags();
  dayOfWeekTags = sortDayOfWeekTags(dayOfWeekTags);

  return (
    <section className="dashboard">
      <div className="header">
        <div className="header__title">
          <h3>Dashboard</h3>
        </div>
      </div>
      <AnnouncementFrame announcements={announcements} />
      <RequestFrame requests={requests} />
      <AvailabilityFrame availabilities={availabilities} dayOfWeekTags={dayOfWeekTags} />
    </section>
  )
}

function getUserRoles(currentOrganization, departments) {
  const roles = new Set();
  departments.forEach((department) => {
    if (currentOrganization.id === department.organizationId) {
      roles.add(department.role.name);
    }
  })

  return [...roles];
}