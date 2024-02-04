

export default function Dashboard({ params }) {
  console.log(params);
  return (
    <section className="dashboard">
      <TopBar />
      <SideNav />
      <Overview />
    </section>
  )
}

export function TopBar() {
  return (
    <div className="top-bar">
      <div>
        <p>left</p>
      </div>
      <div>
        <p>right</p>
      </div>
    </div>
  )
}

export function SideNav() {
  return (
    <aside className="side-nav">
      <nav>
        <h3>SideNav</h3>
      </nav>
    </aside>
  )
}

export function Overview() {
  return (
    <div className="overview">
      <div>
        <h3>Overview</h3>
      </div>
    </div>
  )
}