import Link from "next/link";

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
          <p>OVERVIEW</p>
        </div>
        <ul>
          <li>
            <Link href="/">Overview</Link>
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

export function Overview() {
  const currentDepartment = "Cleaning";
  const user = "admin";
  const announceData = [
    {
      tag: "TASK",
      date: new Date(),
      description: "check the broken wall on the 6 floor"
    }, {
      tag: "ANNOUNCE",
      date: new Date(),
      description: "check the broken wall on the 6 floor"
    }, {
      tag: "CAUTION",
      date: new Date(),
      description: "check the broken wall on the 6 floor"
    }, {
      tag: "TASK",
      date: new Date(),
      description: "check the broken wall on the 6 floor"
    }
  ]

  const availabilities = [
    { "monday": ["all day"] },
    { "tuesday": ["all day"] },
    { "wednesday": ["all day"] },
    { "thursday": ["all day"] },
    { "friday": ["all day"] },
    { "saturday": ["all day"] },
    { "sunday": ["all day"] },
  ]

  return (
    <section className="overview">
      <div className="head">
        <div className="head-top">
          <div className="title title__section">
            <h3>Overview</h3>
          </div>
          <div className="button-group">
            {user === "admin" && <button className="btn btn__round">Create Invitation Link</button>}
            {user === "employee" && <button className="btn btn__round">Create Report</button>}
          </div>
        </div>
        <div className="head-bottom">
          <div className="background-white p__v0h24">
            <span>DEPARTMENT</span>
          </div>
          <div className="select-department">
            <button>
              <span>{currentDepartment}</span>
              <span className="triangle"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="announcement p__v12h24">
        <div className="frame frame__horizontal">
          <h4>Announcements</h4>
          <ul>
            {
              announceData.map((data, index) => {
                return (
                  <li key={index}>
                    <span>{data.tag}: {data.date.toLocaleDateString()}...{data.description}</span>
                  </li>
                )
              })
            }
          </ul>
          <div className="show-all background-white">
            <button>SHOW ALL</button>
          </div>
        </div>
      </div>
      <div className="request-status p__v12h24">
        <div className="frame frame__horizontal">
          <h4>Request Status</h4>
          <ul>
            {
              announceData.map((data, index) => {
                return (
                  <li key={index}>
                    <span>{data.tag}: {data.date.toLocaleDateString()}...{data.description}</span>
                  </li>
                )
              })
            }
          </ul>
          <div className="show-all background-white">
            <button>SHOW ALL</button>
          </div>
        </div>
      </div>
      <div className="availability p__v12h0">
        <div className="frame frame__vertical">
          <h4>Availability</h4>
          <ul>
            {
              availabilities.map((availability, index) => {
                const day = Object.keys(availability)[0]
                return (
                  <li key={index}>
                    <span>{day[0].toUpperCase()+day.slice(1)}: {availability[day]}</span>
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