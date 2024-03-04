"use client"

import { useState, useRef } from "react"
import { submitRequest } from "@/utils/actions";

export default function RequestForm({ userId, departments, requestTypes, shifts }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const ref = useRef();
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const handleSelectedDepartmentId = (event) => {
    setSelectedDepartmentId(event.target.value);
  }

  const handleSelectedType = (event) => {
    const optionTextArray = event.target.innerText.split("\n");
    setSelectedType(optionTextArray[event.target.selectedIndex]);
  }

  return (
    <form ref={ref} className="form" action={async (formData) => {
      try {
        await submitRequest(formData);
        setSelectedType("");
        setError("")
        setSuccess("Successfully made a request");
        ref.current.reset();
      } catch (e) {
        setError(e.message)
        setSuccess("");
      }
    }}>
      <div className="form__group">
        <div>
          <label className="form__label" htmlFor="department">Department:</label>
          <select id="department" name="department" onChange={(event) => handleSelectedDepartmentId(event)}>
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
          <select id="type" name="type" onChange={(event) => handleSelectedType(event)} >
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
        {
          selectedType !== "vacation" &&
          <div>
            <label className="form__label" htmlFor="shift">Shift:</label>
            <select id="shift" name="shift" >
              <option value="">Select a shift</option>
              {
                shifts.map((shift, index) => {
                  if (shift.departmentId === selectedDepartmentId) {
                    return (
                      <option key={index} value={shift.id}>{toShiftString(shift)}</option>
                    )
                  }
                })
              }
            </select>
          </div>

        }
      </div>
      {
        (selectedType === "change" || selectedType === "vacation" || selectedType === "offer-admin") &&
        <div className="form__group form__group--column">
          <div className="form__group__date">
            <div>
              <label className="form__label" htmlFor="startDate">Start Date:</label>
              <input id="startDate" type="date" name="startDate" />
            </div>
            {
              selectedType === "vacation" ?
                <input id="startTime" type="hidden" name="startTime" value="00:00" />
                :
                <div>
                  <label className="form__label" htmlFor="startTime">Start Time:</label>
                  <input id="startTime" type="time" name="startTime" />
                </div>
            }
          </div>
          <div className="form__group__date">
            <div>
              <label className="form__label" htmlFor="endDate">End Date:</label>
              <input id="endDate" type="date" name="endDate" />
            </div>
            {
              selectedType === "vacation" ?
                <input id="endTime" type="hidden" name="endTime" value="00:00" />
                :
                <div>
                  <label className="form__label" htmlFor="endTime">End Time:</label>
                  <input id="endTime" type="time" name="endTime" />
                </div>
            }
          </div>
        </div>
      }
      <div className="form__detail">
        <label className="form__label" htmlFor="detail">Detail:</label>
        <textarea id="detail" className="form__detail--size" type="text" name="detail"></textarea>
      </div>
      {error && <span className="form__text--error-message">{error}</span>}
      {success && <span className="form__text--success-message">{success}</span>}
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

