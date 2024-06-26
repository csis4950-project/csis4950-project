"use client"

import { useState, useEffect } from 'react';
import ReactBigCalendar from "./ReactBigCalendar";
import moment from 'moment';
import Link from "next/link";

export default function Calendar({ session, shifts, isAdmin }) {
  const [selectedDepartment, setSelectedDepartment] = useState(getInitialDepartment(session.departments));
  const [events, setEvents] = useState(createEventData(shifts, selectedDepartment))
  const [view, setView] = useState("month");
  const [date, setDate] = useState(moment());

  useEffect(() => {
    setEvents(createEventData(shifts, selectedDepartment));
  }, [selectedDepartment]);

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
        <div>
          {isAdmin && <Link className='btn' href="/user/calendar/edit-shifts">Edit Shifts</Link>}
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
      const event = formatEventData(shift)
      events.push(event);
    }
  }

  return events;
}

function formatEventData(shift) {
  const { assignedUser, shiftDepartment, shiftTag } = shift;
  const fullName = `${assignedUser.firstName} ${assignedUser.lastName}`;
  if (shiftTag.name === "unassigned") {
    console.log('assignedUser', shift);
  }
  const event = {
    start: moment(shift.startTime).toDate(),
    end: adjustEndTimeIfEvening(shift.endTime, shiftTag.name),
    title: shiftTag.name !== "unassigned" ? fullName : shiftTag.name,
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
