import { Calendar as RBC, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)
const EVENT_COLOR = {
  "morning": "#FDDD8A",
  "evening": "#B7FBDF",
  "night": "#C2D2FF",
  "other": "#B0B0B0",
}
export default function ReactBigCalendar(props) {

  return (
    <div className="">
      <RBC
        {...props}
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView='month'
        views={["month", "week", "day"]}
        style={{ minHeight: "800px" }}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: EVENT_COLOR[event.data.tag],
              color: "#454545",
              textAlign: "center",
              ...event?.style,
            }
          }
        }}
      />
    </div>
  )
}