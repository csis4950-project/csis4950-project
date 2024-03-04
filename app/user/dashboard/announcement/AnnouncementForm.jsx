"use client"

import { publishNewAnnouncement } from "@/utils/actions";
import { useState, useRef, use } from "react";

const ERROR_MESSAGE = "Please fill all fields and choose at least one option and department.";
const SUCCESS_MESSAGE = "Successfully published the announcement";
export default function AnnouncementForm({ userId, departments, announcementTypes }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const ref = useRef();

  return (
    <form ref={ref} className="form" action={async (formData) => {
      try {
        await publishNewAnnouncement(formData);
        ref.current?.reset();
        setError(false);
        setSuccess(true);
      } catch (e) {
        setError(true);
        setSuccess(false);
      }
    }}>
      <div className="form__group">
        <div>
          <label className="form__label" htmlFor="type">Type:</label>
          <select id="type" name="type" >
            <option value="">Select an option</option>
            {
              announcementTypes.map(({ id, name }, index) => {
                return (
                  <option key={index} value={id}>{name}</option>
                )
              })
            }
          </select>
        </div>
        <div>
          <label className="form__label" htmlFor="title">Title:</label>
          <input id="title" type="text" name="title" />
        </div>
        <div>
          <label className="form__label" htmlFor="date">Expiration Date:</label>
          <input id="date" type="date" name="expirationTime" />
        </div>
      </div>
      <div className="form__group">
        <div>
          {
            departments.map(({ departmentId, departmentName }, index) => {
              if (!departmentName.startsWith("__")) {
                return (
                  <div key={index}>
                    <input type="checkbox" name="department" value={departmentId} />
                    <label>{departmentName}</label>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
      <div className="form__detail">
        <label className="form__label" htmlFor="detail">Detail:</label>
        <textarea id="detail" className="form__detail--size" type="text" name="detail"></textarea>
      </div>
      {error && <span className="form__text--error-message">{ERROR_MESSAGE}</span>}
      {success && <span className="form__text--success-message">{SUCCESS_MESSAGE}</span>}
      <input type="hidden" name="userId" value={userId} />
      <button className="form__btn" type="submit">Announce</button>
    </form>
  )
}