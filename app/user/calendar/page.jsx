"use client"
import { useState } from 'react'
import MyCalendar from "./Calendar";
import moment from 'moment'

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

export default function CalendarC() {
  const [view, setView] = useState("month");
  const [date, setDate] = useState(moment());

  // getEvents()
  const [events, setEvents] = useState([
    {
      // this also works
      // start: new Date("2024/2/1"),
      // end: new Date("2024/2/10"),
      start: moment().toDate(),
      end: moment()
        .add(2, "days")
        .toDate(),
      title: "Some title"
    },
    {
      // this also works
      // start: new Date("2024/2/1"),
      // end: new Date("2024/2/10"),
      start: moment().toDate(),
      end: moment()
        .add(1, "days")
        .toDate(),
      title: "Some title"
    },
    {
      // this also works
      // start: new Date("2024/2/1"),
      // end: new Date("2024/2/10"),
      start: moment().toDate(),
      end: moment()
        .add(1, "days")
        .toDate(),
      title: "Some title"
    },
    {
      // this also works
      // start: new Date("2024/2/1"),
      // end: new Date("2024/2/10"),
      start: moment().toDate(),
      end: moment()
        .add(3, "days")
        .toDate(),
      title: "Some title"
    },
  ])

  return (
    <section className='calendar'>
      <h1>calendar</h1>
      <div className='selection'>
        <div className='background-white p__v0h24'>
          <span>DEPARTMENT</span>
        </div>
        <button>
          CLEANING
          <span className='triangle'></span>
        </button>
        <button>
          TOWER2
          <span className='triangle'></span>
        </button>
      </div>
      <MyCalendar
        view={view}
        date={date}
        events={events}
        onNavigate={(newDate, view, action) => { setDate(moment(newDate)) }}
        onView={(selectedView) => setView(selectedView)}
      // onSelectEvent={(e) => { console.log(e); }}
      // onShowMore={(e, d, c) => { console.log(e, "Show more: " + d, c); }}
      // onSelectSlot={(e, d) => { console.log(e, "Slot: " + d); }}
      // onDrillDown={(e, d, c) => { console.log(e, "drill: " + d, c); }}
      />

    </section>
  )
}