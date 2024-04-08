"use client"

import { updateUserRole } from "@/utils/actions";
import { useState, useRef } from "react";

export default function ChangeRoleButton({ departmentMemberId, roles }) {
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef();

  return (
    <div className="form-container form-container--center">
      <div className={visibility ? "fullscreen fullscreen--center" : "hidden"}>
        <form ref={ref} className="form" action={async (formData) => {
          try {
            await updateUserRole(formData);
            ref.current?.reset();
            setVisibility(false);
            setError("");
          } catch (e) {
            setError("ServerError: Please try later");
          }
        }}>
          <div>
            <div>
              <label htmlFor="role">Role: </label>
              <select id="role" name="roleId" className="group__select">
                {
                  roles.map((role, index) => {
                    return <option key={index} value={role.id}>{role.name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div>
            {error && <span>{error}</span>}
          </div>
          <div className="form__btns">
            <input type="hidden" name="departmentMemberId" value={departmentMemberId} />
            <button className="btn" type="submit">SUBMIT</button>
            <button className="btn" type="button" onClick={() => setVisibility(false)}>CANCEL</button>
          </div>
        </form>
      </div >
      <div className="form-container__btn--right">
        <button className="btn btn--cancel" type="button" onClick={() => setVisibility(true)}>CHANGE ROLE</button>
      </div>
    </div >
  )
}