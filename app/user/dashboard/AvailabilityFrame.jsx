import Link from "next/link";

export default async function AvailabilityFrame({ availabilities, dayOfWeekTags }) {
  return (
    <div className="availability-frame">
      <div className="frame">
        <h4>Availability</h4>
        <ul className="list list--no-wrap">
          {
            availabilities.map((availability, index) => {
              const dayOfWeekTag = getDayOfWeekTag(dayOfWeekTags, index);
              if (dayOfWeekTag.name === "other") return;
              const dayOfWeek = dayOfWeekTag.name[0].toUpperCase() + dayOfWeekTag.name.slice(1);
              const time = `${availability?.startTime} - ${availability?.endTime}`;

              return (
                <li key={index} className="list__item">
                  <span>{dayOfWeek}: {availability ? time : "Unavailable"}</span>
                </li>
              )
            })
          }
        </ul>
        <span><b>NOTES</b></span>
        <ul className="list">
          {
            availabilities.map((availability, index) => {
              const dayOfWeekTag = getDayOfWeekTag(dayOfWeekTags, index);
              if (dayOfWeekTag.name !== "other") return;
              return (
                <li key={index} className="list__item">
                  <span>{"Other"}: {`${availability?.note}`}</span>
                </li>
              )
            })
          }
        </ul>
        <div className="btn btn--show-all">
          <Link className="btn--show-all__text" href="/user/dashboard/availability">EDIT</Link>
        </div>
      </div>
    </div>
  )
}

function getDayOfWeekTag(dayOfWeekTags, index) {
  return dayOfWeekTags[index < 7 ? index : 7];
}