"use client";

import { submitCreateDepartmentForm } from "@/utils/actions";
import { useState, useRef } from "react";

export default function CreateDepartmentFrom({ curOrgId }) {
  const [visibility, setVisibility] = useState(false);
  const ref = useRef();
  return (
    <div className="form-container">
      <div className={visibility ? "fullscreen fullscreen--center" : "hidden"}>
        <form ref={ref} className="form" action={async (formData) => {
          try {
            await submitCreateDepartmentForm(formData);
            ref.current?.reset();
            setVisibility(false);
          } catch (e) {
            console.log('e', e);
          }
        }}>
          <div className="">
            <label className="form__label" htmlFor="name">Department Name:</label>
            <input id="name" name="name" />
          </div>
          <div className="form__btns">
            <input type="hidden" name="curOrgId" value={curOrgId} />
            <button className="btn" type="submit">CREATE</button>
            <button className="btn" type="button" onClick={() => setVisibility(false)}>CANCEL</button>
          </div>
        </form>
      </div>
      <div className="form-container__btn--right">
        <button className="btn" type="button" onClick={() => setVisibility(true)}>Create Department</button>
      </div>
    </div >
  )
}