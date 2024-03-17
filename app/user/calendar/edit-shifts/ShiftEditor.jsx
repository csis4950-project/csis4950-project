"use client";

import { useState } from "react";

const DEFAULT_DATE = getDefaultDate();
const DEFAULT_TIME = "08:00";

export default function ShiftEditor({ session, selectedDepartment, users, shiftTags, updateEvents }) {
  const [toggle, setToggle] = useState(false);
  const [selectedTag, setSelectedTag] = useState(shiftTags[0]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function submit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const { member: user } = users[formData.get("user")];
    const start = getStartTime(selectedTag, formData);
    const end = getEndTime(selectedTag, formData, start);

    if (isNaN(start) || isNaN(end) || start.getTime() >= end.getTime()) {
      setError("Please double-check the date is correctly inputted");
      setSuccess(null);
      return;
    }
    const newEvent = {
      start: start,
      end: end,
      title: selectedTag.name,
      data: {
        tag: selectedTag.name,
        user: user,
        departmentId: selectedDepartment.id,
        departmentName: selectedDepartment.name
      }
    }
    setError(null);
    setSuccess("Successfully added to the draft schedule");
    updateEvents(newEvent);
  }

  return (
    <div className="editor">
      <div className="editor__btn--open">
        <button className='btn' onClick={() => setToggle(true)}>Open Editor</button>
      </div>
      <div className={toggle ? "editor__container" : "editor__container close"}>
        <div className="editor__btn--close">
          <button className="btn" onClick={() => (setToggle(false))}>Close</button>
        </div>
        <form className="editor__form" onSubmit={submit}>
          <span>New Shift</span>
          <div className="editor__input-fields">
            <div className="editor__input-field">
              <label className="editor__label">Employee:</label>
              <select name="user">
                {
                  users.map((user, index) => {
                    if (user.departmentId !== selectedDepartment.id) return;
                    const member = user.member;
                    const fullName = `${member.firstName} ${member.lastName}`
                    return (
                      <option key={index} value={index}>{fullName}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="editor__input-field">
              <label className="editor__label">Shift Tag:</label>
              <select name="tag" onChange={(event) => setSelectedTag(shiftTags[event.target.value])}>
                {
                  shiftTags.map((tag, index) => {
                    if (tag.name !== "unassigned") {
                      return <option key={index} value={index}>{tag.name}</option>;
                    }
                  })
                }
              </select>
            </div>
            <div className="editor__input-field">
              <label className="editor__label">Start Date:</label>
              <input type="date" defaultValue={DEFAULT_DATE} min={DEFAULT_DATE} name="startDate" />
            </div>
            {
              selectedTag.name === "other" &&
              <>
                <div className="editor__input-field">
                  <label className="editor__label">Start Time:</label>
                  <input type="time" name="startTime" defaultValue={DEFAULT_TIME} />
                </div>
                <div className="editor__input-field">
                  <label className="editor__label" defaultValue={DEFAULT_DATE} min={DEFAULT_DATE} >End Date:</label>
                  <input type="date" name="endDate" />
                </div>
                <div className="editor__input-field">
                  <label className="editor__label">End Time:</label>
                  <input type="time" name="endTime" defaultValue={DEFAULT_TIME} />
                </div>
              </>
            }
          </div>
          <div>
            {error && <p className="text--error">{error}</p>}
            {success && <p className="text--success">{success}</p>}
            <button className="btn" type="submit">ADD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function getStartTime(tag, formData) {
  if (tag.name === "morning") {
    return new Date(`${formData.get("startDate")} 8:00`);
  }
  if (tag.name === "evening") {
    return new Date(`${formData.get("startDate")} 16:00`);
  }
  if (tag.name === "night") {
    return new Date(`${formData.get("startDate")} 0:00`);
  }
  if (tag.name === "other") {
    return new Date(`${formData.get("startDate")} ${formData.get("startTime")}`);
  }
}

function getEndTime(tag, formData, start) {
  if (tag.name !== "other") {
    const date = new Date()
    const preventPassMidnight = tag.name === "evening" ? 1 : 0;
    const eightHours = 8 * 1000 * 60 * 60 - preventPassMidnight;
    date.setTime(start.getTime() + eightHours);
    return date
  }

  return new Date(`${formData.get("endDate")} ${formData.get("endTime")}`);
}

function getDefaultDate() {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`
}

