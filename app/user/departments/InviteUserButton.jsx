import { sendInvitation } from "@/utils/actions";
import { useState, useRef, useEffect } from "react";

export default function InviteUserButton({ curOrg, departments }) {
  const [visibility, setVisibility] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (departments.length) {
      setSelectedDepartment(departments[0].name);
    }
  }, [])
  const handleEvent = (event) => {
    setSelectedDepartment(event.target.selectedOptions[0].innerText);
  }

  return (
    <div className="form-container">
      <div className={visibility ? "fullscreen fullscreen--center" : "hidden"}>
        <form ref={ref} className="form" action={async (formData) => {
          try {
            await sendInvitation(formData);
            ref.current?.reset();
            setVisibility(false);
            setError("");
          } catch (e) {
            setError(e.message);
          }
        }}>
          <div>
            <div>
              <label htmlFor="department">Department: </label>
              <select id="department" name="departmentId" className="group__select" onChange={(event) => handleEvent(event)}>
                {
                  departments.length !== 0
                    ? departments.map((department, index) => {
                      return <option key={index} value={department.id}>{department.name}</option>
                    })
                    : <option value="">No Departments</option>
                }
              </select>
            </div>
            <div>
              <label className="form__label" htmlFor="firstName">First Name:</label>
              <input id="firstName" name="firstName" />
            </div><div>
              <label className="form__label" htmlFor="lastName">Last Name:</label>
              <input id="lastName" name="lastName" />
            </div>
          </div>
          <div>
            <label className="form__label" htmlFor="email">Email:</label>
            <input id="email" name="email" />
          </div>
          <div>
            {error && <span>{error}</span>}
          </div>
          <div className="form__btns">
            <input type="hidden" name="organizationId" value={curOrg.id} />
            <input type="hidden" name="organization" value={curOrg.name} />
            <input type="hidden" name="department" value={selectedDepartment} />
            <button className="btn" type="submit">SEND</button>
            <button className="btn" type="button" onClick={() => setVisibility(false)}>CANCEL</button>
          </div>
        </form>
      </div >
      <div className="form-container__btn--right">
        <button className="btn" type="button" onClick={() => setVisibility(true)}>INVITE</button>
      </div>
    </div >
  )
}