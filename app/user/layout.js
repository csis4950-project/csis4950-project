import Link from "next/link";

export default function Layout({ children }) {

  return (
    <section className="user-page-layout">
      <TopBar />
      <SideNav />
      <div className="grid__dashboard-contents">
        {children}
      </div>
    </section>
  )
}

export function TopBar() {
  return (
    <div className="top-bar">
      <div>
        <button className="btn btn__square">Organization Name</button>
      </div>
      <div>
        <button className="btn btn__round">User1</button>
      </div>
    </div>
  )
}

export function SideNav() {
  return (
    <aside className="side-nav">
      <nav>
        <div className="background-white">
          <p>DASHBOARD</p>
        </div>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <div className="background-white">
          <p>SERVICES</p>
        </div>
        <ul>
          <li>
            <Link href="/">Calendar</Link>
          </li>
          <li>
            <Link href="/">Summary</Link>
          </li>
          <li>
            <Link href="/">Work</Link>
          </li>
        </ul>
        <div className="background-white">
          <p>SECURITY</p>
        </div>
        <ul>
          <li>
            <Link href="/">Employees</Link>
          </li>
          <li>
            <Link href="/">Permissions</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}