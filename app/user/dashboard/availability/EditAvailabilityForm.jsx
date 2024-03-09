"use client";
import { submitAvailability } from "@/utils/actions";
import { useState, useRef } from "react";

const initialTagState = {
  id: "",
  tagTypeId: "",
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: ""
}

export default function EditAvailabilityForm({ availabilities, userId, dayOfWeekTags }) {
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("Select a day of week");
  const [dayOfWeekTag, setDayOfWeekTag] = useState(initialTagState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const ref = useRef();

  const handleSelectedDayOfWeek = (event) => {
    const optionTextArray = event.target.innerText.split("\n");
    const dayOfWeek = optionTextArray[event.target.selectedIndex];
    setSelectedDayOfWeek(dayOfWeek);
    setDayOfWeekTag((prev) => {
      return {
        ...prev,
        ...dayOfWeekTags[event.target.selectedIndex - 1]
      }
    });
    console.log('check', dayOfWeek);
  }
  return (

    <form ref={ref} className="form" action={async (formData) => {
      try {
        await submitAvailability(formData);
        setError("");
        setSuccess("Successfully updated");
        setSelectedDayOfWeek("Select a day of week");
        ref.current.reset();
      } catch (error) {
        setError(error.message);
        setSuccess("");
      }
    }}>
      <div className="form__group">
        <label htmlFor="availabilityOfDayOfWeek">Day of Week:</label>
        <select
          id="availabilityOfDayOfWeek" name="availabilityOfDayOfWeek"
          onChange={(event) => handleSelectedDayOfWeek(event)} >
          <option value="" >Select a day of week</option>
          {
            dayOfWeekTags.map((tag, index) => {
              const day = tag.name[0].toUpperCase() + tag.name.slice(1);
              return (
                <option key={index} value={availabilities[index]?.id ?? "no-data"} >{day}</option>
              )
            })
          }
        </select>
      </div>
      {
        selectedDayOfWeek !== "Other" &&
        <div className="form__group">
          <div className="form__group__date">
            <label htmlFor="startTime">Start Time:</label>
            <input id="startTime" name="startTime" type="time" />
          </div>
          <div className="form__group__date">
            <label htmlFor="endTime">End Time:</label>
            <input id="endTime" name="endTime" type="time" />
          </div>
        </div>
      }
      <div className="form__group">
        <label htmlFor="note">Note:</label>
        <textarea id="note" className="form__group__note" name="note" type="text" maxLength="250" />
      </div>
      {error && <span className="form__text--error-message">{error}</span>}
      {success && <span className="form__text--success-message">{success}</span>}
      <input type="hidden" name="selectedDayOfWeek" value={selectedDayOfWeek} />
      <input type="hidden" name="dayOfWeekId" value={dayOfWeekTag.id} />
      <input type="hidden" name="dayOfWeekTagId" value={selectedDayOfWeek} />
      <input type="hidden" name="userId" value={userId} />
      <button className="form__btn" type="submit">Apply</button>
    </form>
  )
}