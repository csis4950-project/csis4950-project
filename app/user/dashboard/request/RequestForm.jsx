"use client"

import { useEffect, useState } from "react"
import { submitRequest } from "@/utils/actions";

const ERROR_MESSAGE = "error message here";

export default function RequestForm({ userId, departments, requestTypes, shifts }) {
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleSelectedType = (event) => {
    const optionTextArray = event.target.innerText.split("\n");
    setSelectedType(optionTextArray[event.target.selectedIndex])
  }

  return (
    <form className="form" action={async (formData) => {
      try {
        console.log('formData', formData);
        await submitRequest(formData);
      } catch (e) {
        console.log('error', e);
        setError(e.message)
      }
    }}>
      <div className="form__group">
        <div>
          <label className="form__label" htmlFor="department">Department:</label>
          <select id="department" name="department" >
            <option value="">Select a department</option>
            {
              departments.map(({ departmentId, departmentName }, index) => {
                if (!departmentName.startsWith("__")) {
                  return (
                    <option key={index} value={departmentId}>{departmentName}</option>
                  )
                }
              })
            }
          </select>
        </div>
      </div>
      <div className="form__group">
        <div>
          <label className="form__label" htmlFor="type">Type:</label>
          <input type="hidden" name="typeName" value={selectedType} />
          <select id="type" name="type" onChange={(e) => handleSelectedType(e)} >
            <option value="">Select a request type</option>
            {
              requestTypes.map(({ id, name }, index) => {
                return (
                  <option key={index} value={id}>{name}</option>
                )
              })
            }
          </select>
        </div>
        <div>
          <label className="form__label" htmlFor="shift">Shift:</label>
          <select id="shift" name="shift" >
            <option value="">Select a shift</option>
            {
              shifts.map((shift, index) => {
                return (
                  <option key={index} value={shift.id}>{toShiftString(shift)}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      <div className="form__group">
        <div>
          <div>
            <label className="form__label" htmlFor="startDate">Start Date:</label>
            <input id="startDate" type="date" name="startDate" />
          </div>
          <div>
            <label className="form__label" htmlFor="startTime">Start Time:</label>
            <input id="startTime" type="time" name="startTime" />
          </div>
        </div>
        <div>
          <div>
            <label className="form__label" htmlFor="endDate">End Date:</label>
            <input id="endDate" type="date" name="endDate" />
          </div>
          <div>
            <label className="form__label" htmlFor="endTime">End Time:</label>
            <input id="endTime" type="time" name="endTime" />
          </div>
        </div>
      </div>
      <div className="form__detail">
        <label className="form__label" htmlFor="detail">Detail:</label>
        <textarea id="detail" className="form__detail--size" type="text" name="detail"></textarea>
      </div>
      {error && <span className="form__text--error-message">{error}</span>}
      <input type="hidden" name="userId" value={userId} />
      <button className="form__btn" type="submit">Submit</button>
    </form>
  )
}

function toShiftString(shift) {
  const { id, startTime, endTime, shiftTag } = shift;
  const startDateString = new Date(startTime).toLocaleDateString();
  const startTimeString = new Date(startTime).toLocaleTimeString();
  const endTimeString = new Date(endTime).toLocaleTimeString();
  const shiftString = `${startDateString}: ${shiftTag.name} <${startTimeString} - ${endTimeString}>`;
  return shiftString;
}