"use client"
import { useState, useEffect } from 'react';
import ReactBigCalendar from "./ReactBigCalendar";
import moment from 'moment';
import { revalidatePath } from "next/cache"

const handleNavigate = {
  "NEXT": (e) => {
    console.log('next');
    console.log(e);
  },
  "PREV": (e) => {
    console.log('back');
    console.log(e);
  },
  "DATE": (e) => {
    console.log('date');
    console.log(e);
  },
  "TODAY": (e) => {
    console.log('today');
    console.log(e);
  }
}

const initialStateOfSelectedDepartment = {
  selected: {},
  departments: []
}

const initialStateOfEvents = []


export default function Calendar() {
  const [session, setSession] = useState(null);
  const [shifts, setShifts] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(initialStateOfSelectedDepartment);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(moment());
  const [events, setEvents] = useState(initialStateOfEvents)

  useEffect(() => {
    const loadData = async () => {

      const userSession = await fetchSession();
      const initialSelectedDepartment = userSession.departments[0];
      const shiftData = await fetchShiftsByUserDepartments(userSession.departments);
      const eventData = createEventData(shiftData, initialSelectedDepartment);

      setSession(userSession);
      setShifts(shiftData);
      setEvents(eventData);
      setSelectedDepartment((prev) => {
        return {
          ...prev,
          selected: initialSelectedDepartment,
          departments: userSession.departments
        }
      });
    }
    loadData();
  }, [])

  return (
    <section className='calendar'>
      <h1>calendar</h1>
      <div className='selection'>
        <form className='form form__selection' action={async (formData) => {
          // const department = formData.get("selectedDepartment");
          // const shiftData = await getShiftsByDepartmentId(department.id);
          // setSelectedDepartment(department);
          // handle state????????????/

          setSelectedDepartment((prev) => {
            return {
              ...prev,
              selected: prev.departments[formData.get("selectedDepartment")]
            }
          })
        }}>
          <div className='form__label'>
            <label className='form__label--black' htmlFor='departmentSelection'>DEPARTMENT</label>
          </div>
          <select id="departmentSelection" className='form__input form__input--select' name="selectedDepartment" type="text">
            {session && session.departments.map((department, index) => {
              const { departmentId, departmentName } = department;
              if (!departmentName.startsWith("__")) {
                return (
                  <option key={index} value={index}>{departmentName}</option>
                )
              }
            })}
          </select>
          <input className="form__input form__input--submit" type="submit" value="APPLY" />
        </form>
        {/* from here */}
        <span>{selectedDepartment.departments[selectedDepartment.currentIndex]?.departmentName}</span>
      </div>
      <ReactBigCalendar
        view={view}
        date={date}
        events={events}
        onNavigate={(newDate, view, action) => { setDate(moment(newDate)) }}
        onView={(selectedView) => setView(selectedView)}
        onSelectEvent={(event) => { console.log(event); }}
      // onShowMore={(e, d, c) => { console.log(e, "Show more: " + d, c); }}
      // onSelectSlot={(e, d) => { console.log(e, "Slot: " + d); }}
      // onDrillDown={(e, d, c) => { console.log(e, "drill: " + d, c); }}
      />

    </section>
  )
}

async function fetchSession() {
  const response = await fetch("/api/session", { method: "POST" });
  const data = await response.json();
  const { status, result } = data;
  if (status === "success") {
    return result.payload;
  }

  return null;
}

async function fetchShiftsByUserDepartments(departments) {

  const payload = {
    departments: departments
  }

  const response = await fetch("/api/api_utils/db/shift-by-departments", {
    method: "POST",
    headers: { "ContentType": "application/json" },
    body: JSON.stringify(payload)
  })

  const data = await response.json();
  const { result } = data;
  return result;
}

function createEventData(shifts, selectedDepartment) {
  const events = [];
  for (const shift of shifts) {
    if (isSelectedDepartment(shift.shiftDepartment, selectedDepartment)) {
      const event = formatEvent(shift)
      events.push(event);
    }
  }

  return events;
}

function isSelectedDepartment(department, selectedDepartment) {
  return department.id === selectedDepartment.departmentId
}

function formatEvent(shift) {
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
