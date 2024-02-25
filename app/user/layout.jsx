import Link from "next/link";
import { getSession } from "@/utils/session";

export default async function Layout({ children }) {
  const { payload: session } = await getSession();

  return (
    <section className="user-page-layout">
      <TopBar organizations={session.organizations} fullName={session.fullName} />
      <SideNav currentOrganization={session.currentOrganization} departments={session.departments} />
      <div className="grid__dashboard-contents">
        {children}
      </div>
    </section>
  )
}

export function TopBar({ organizations, fullName }) {
  return (
    <div className="top-bar">
      <div>
        <button className="btn btn__square">{organizations[0].name}</button>
      </div>
      <div>
        <button className="btn btn__round">{fullName}</button>
      </div>
    </div>
  )
}

export function SideNav({ currentOrganization, departments }) {
  const roles = departments.map(department => {
    if (currentOrganization.id === department.organizationId) {
      return department.role;
    }
  })

  const isAdmin = roles.includes("owner") || roles.includes("admin")

  return (
    <aside className="side-nav">
      <nav className="nav">
        <div className="nav__title">
          <p className="nav__title__text">DASHBOARD</p>
        </div>
        <ul className="nav__list">
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/dashboard">Dashboard</Link>
          </li>
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/user/dashboard/announcement">Announcements</Link>
          </li>
        </ul>
        <div className="nav__title">
          <p className="nav__title__text">SERVICES</p>
        </div>
        <ul className="nav__list">
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/">Calendar</Link>
          </li>
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/">Summary</Link>
          </li>
          <li className="nav__list__item">
            <Link className="nav__list__item__text" href="/">Work</Link>
          </li>
        </ul>
        {isAdmin &&
          <>
            <div className="nav__title">
              <p className="nav__title__text">SECURITY</p>
            </div>
            <ul className="nav__list">
              <li className="nav__list__item">
                <Link className="nav__list__item__text" href="/">Employees</Link>
              </li>
              <li className="nav__list__item">
                <Link className="nav__list__item__text" href="/">Permissions</Link>
              </li>
            </ul>
          </>
        }
      </nav>
    </aside>
  )
}