import Link from "next/link";
import { announceData, availabilities } from "@/data/testData";
import { getSession } from "@/utils/utils";

export default async function Dashboard(params) {
  // console.log("params: ", params);
  const currentDepartment = "Cleaning";
  const user = "admin";
  const session = await getSession();
  // console.log(session);

  return (
    <section className="dashboard">
      <div className="head">
        <div className="head-top">
          <div className="title title__section">
            <h3>Dashboard</h3>
          </div>
          <div className="button-group">
            {user === "admin" && <button className="btn btn__round">Create Invitation Link</button>}
            {user === "employee" && <button className="btn btn__round">Create Report</button>}
          </div>
        </div>
        {/* <div className="head-bottom">
          <div className="background-white p__v0h24">
            <span>DEPARTMENT</span>
          </div>
          <div className="select-department">
            <button>
              <span>{currentDepartment}</span>
              <span className="triangle"></span>
            </button>
          </div>
        </div> */}
      </div>
      <div className="announcement p__v12h24">
        <div className="frame frame__horizontal">
          <h4>Announcements</h4>
          <ul>
            {
              announceData.map((data, index) => {
                return (
                  <li key={index}>
                    <span>{data.tag}: {new Date(data.date).toLocaleDateString()}...{data.description}</span>
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
                    <span>{data.tag}: {new Date(data.date).toLocaleDateString()}...{data.description}</span>
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