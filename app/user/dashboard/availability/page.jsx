import { getSession } from "@/utils/session";
import { getAvailabilitiesByUserId, getDayOfWeekTags } from "@/utils/db";
import { sortAvailabilitiesByDayOfWeek, sortDayOfWeekTags } from "@/utils/utils";
import EditAvailabilityForm from "./EditAvailabilityForm";
import UnavailableButton from "./UnavailableButton";
import DeleteAvailabilityButton from "./DeleteAvailabilityButton";

export default async function Availability() {
  const { payload: session } = await getSession();

  let dayOfWeekTags = await getDayOfWeekTags();
  dayOfWeekTags = sortDayOfWeekTags(dayOfWeekTags);

  let availabilities = await getAvailabilitiesByUserId(session.userId);
  availabilities = sortAvailabilitiesByDayOfWeek(availabilities);

  return (
    <section className="edit-availability">
      <div className="header">
        <div className="header__title">
          <h3>Edit Availabilities</h3>
        </div>
      </div>
      <div>
        <EditAvailabilityForm availabilities={availabilities} userId={session.userId} dayOfWeekTags={dayOfWeekTags} />
      </div>
      <div className="overflow-y">
        <table className="table">
          <thead>
            <tr className="table__row table__row--size-head">
              <th>Days</th>
              <th>From</th>
              <th>To</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              availabilities.map((availability, index) => {
                const isOther = index >= 7;
                const dayOfWeekTag = isOther ? dayOfWeekTags[7] : dayOfWeekTags[index];
                const dayOfWeek = dayOfWeekTag.name[0].toUpperCase() + dayOfWeekTag.name.slice(1);
                const isNoData = !availability?.startTime && !availability?.endTime;

                return (
                  <tr key={index} className="table__row table__row--size-body">
                    <td className="table__cel table__cel--medium">{dayOfWeek}</td>
                    <td className="table__cel table__cel--small">{availability?.startTime ?? "-"}</td>
                    <td className="table__cel table__cel--small">{availability?.endTime ?? "-"}</td>
                    <td className="table__cel table__cel--large">{isNoData && !isOther ? "Unavailable" : availability?.note ?? "-"}</td>
                    <td className="table__cel table__cel--medium">
                      {!isNoData && <UnavailableButton availabilityId={availability?.id} />}
                      {isOther && <DeleteAvailabilityButton availabilityId={availability?.id} />}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
