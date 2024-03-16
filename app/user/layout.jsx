import Link from "next/link";
import { getSession } from "@/utils/session";

export default async function Layout({ children }) {
  const { payload: session } = await getSession();

  return (
    <section className="user-page-layout">
      <SideNav currentOrganization={session.currentOrganization} departments={session.departments} />
      <div className="grid__dashboard-contents">
        {children}
      </div>
    </section>
  )
}

export function SideNav({ currentOrganization, departments }) {
  const roles = departments.map(department => {
    if (currentOrganization.id === department.organizationId) {
      return department.role.name;
    }
  })

  const isAdmin = roles.includes("owner") || roles.includes("admin")

  return (
    <aside className="side-nav">
      <nav className="nav">
        <div className="nav__title">
          <p className="nav__title__text">Organization</p>
        </div>
        <ul className="nav__list">
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/dashboard">{currentOrganization.name}</Link>
          </li>
        </ul>
        <div className="nav__title">
          <p className="nav__title__text">DASHBOARD</p>
        </div>
        <ul className="nav__list">
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/dashboard">Dashboard</Link>
          </li>
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/dashboard/announcement">Announcement</Link>
          </li>
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/dashboard/request">Request</Link>
          </li>
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/dashboard/availability">Availability</Link>
          </li>
        </ul>
        <div className="nav__title">
          <p className="nav__title__text">SERVICES</p>
        </div>
        <ul className="nav__list">
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/calendar">Calendar</Link>
          </li>
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/summary">Summary</Link>
          </li>
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/work">Work</Link>
          </li>
        </ul>
        {isAdmin &&
          <>
            <div className="nav__title">
              <p className="nav__title__text">SECURITY</p>
            </div>
            <ul className="nav__list">
              <li className="nav__list__item">
                <Link className="nav__list__item__text" href="/user/departments">Departments</Link>
              </li>
              <li className="nav__list__item">
                <Link className="nav__list__item__text" href="/user/permissions">Permissions</Link>
              </li>
            </ul>
          </>
        }
      </nav>
    </aside>
  )
}