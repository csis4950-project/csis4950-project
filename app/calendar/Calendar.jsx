import { Calendar as RBC, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)




export default function Calendar(props) {

  return (
    <div className="">
      <RBC
        {...props}
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView='month'
        views={["month", "week", "day"]}
        style={{ height: "100vh" }}
      />
    </div>
  )
}