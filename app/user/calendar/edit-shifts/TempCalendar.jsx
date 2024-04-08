"use client"
import { useState, useEffect } from 'react';
import ReactBigCalendar from "@/app/user/calendar/ReactBigCalendar";
import moment from 'moment';
import ShiftEditor from './ShiftEditor';
import { submitScheduleDraft } from '@/utils/actions';

export default function TempCalendar({ session, existingShifts, users, shiftTags }) {
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(getInitialDepartment(session.departments));
  const [createdEvents, setCreatedEvents] = useState([]);
  const [events, setEvents] = useState([])
  const [view, setView] = useState("month");
  const [date, setDate] = useState(moment());

  useEffect(() => {
    const filteredShifts = existingShifts.filter((shift) => shift.departmentId === selectedDepartment.id);
    const eventData = createEventData(filteredShifts, selectedDepartment);
    const filteredEvents = createdEvents.filter((event) => event.departmentId === selectedDepartment.id)
    setEvents([...eventData, ...filteredEvents, ...createdEvents]);
  }, [createdEvents]);

  useEffect(() => {
    const filteredShifts = existingShifts.filter((shift) => shift.departmentId === selectedDepartment.id);
    setEvents(createEventData(filteredShifts, selectedDepartment));
  }, [selectedDepartment]);

  function updateEvents(newEvent) {
    setCreatedEvents((prev) => {
      return [...prev, newEvent];
    })
  }
  return (
    <div>
      <div className='container'>
        <div className='select'>
          <div className='select__label'>
            <label className='select__label--black' htmlFor='departmentSelection'>DEPARTMENT</label>
          </div>
          <select id="departmentSelection" className='select__input select__input--select' type="text" onChange={(event) => { setSelectedDepartment(session.departments[event.target.value]) }}>
            {session.departments.map((department, index) => {
              const { name } = department;
              if (!name.startsWith("__")) {
                return (
                  <option key={index} value={index}>{name}</option>
                )
              }
            })}
          </select>
        </div>
        <div className='btns'>
          <form action={async (formData) => {
            try {
              await submitScheduleDraft(formData);
            } catch (e) {
              setError(e.message);
            }
          }}>
            <input type='hidden' name="newShiftData" value={JSON.stringify(createdEvents)} />
            <button className="btn" type='submit'>Complete</button>
          </form>
          <ShiftEditor session={session} selectedDepartment={selectedDepartment} users={users} shiftTags={shiftTags} updateEvents={updateEvents} />
        </div>
      </div>
      <ReactBigCalendar
        view={view}
        date={date}
        events={events}
        onNavigate={(newDate, view, action) => { setDate(moment(newDate)) }}
        onView={(selectedView) => setView(selectedView)}
      // onSelectEvent={(event) => { console.log(event); }}
      // onShowMore={(e, d, c) => { console.log(e, "Show more: " + d, c); }}
      // onSelectSlot={(e, d) => { console.log(e, "Slot: " + d); }}
      // onDrillDown={(e, d, c) => { console.log(e, "drill: " + d, c); }}
      />
    </div>
  )
}

function getInitialDepartment(departments) {
  for (const department of departments) {
    if (!department.name.startsWith("__")) {
      return department;
    }
  }
}

function createEventData(shifts, selectedDepartment) {
  const events = [];
  for (const shift of shifts) {
    if (shift.departmentId === selectedDepartment.id) {
      const event = selectedEvent(shift)
      events.push(event);
    }
  }

  return events;
}

function selectedEvent(shift) {
  const { assignedUser, shiftDepartment, shiftTag } = shift;
  assignedUser["fullName"] = `${assignedUser.firstName} ${assignedUser.lastName}`;

  const event = {
    start: moment(shift.startTime).toDate(),
    end: adjustEndTimeIfEvening(shift.endTime, shiftTag.name),
    title: shiftTag.name,
    data: {
      tag: shiftTag.name,
      user: assignedUser,
      departmentId: shiftDepartment.id,
      departmentName: shiftDepartment.name
    }
  }
  return event;
}

function adjustEndTimeIfEvening(time, tagName) {
  return tagName === "evening" ? moment(time).add(-1, "second").toDate() : moment(time).toDate();
}