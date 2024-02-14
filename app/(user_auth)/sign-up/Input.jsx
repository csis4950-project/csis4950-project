"use client"
import { useState } from "react"

export default function Input() {
  const [pages, setPages] = useState(0);
  const visible = { display: "block" }
  const invisible = { display: "none" }
  return (
    <div>
      <div style={pages === 0 ? visible : invisible}>
        <label htmlFor="fName">First Name</label>
        <input type="text" id="fName" name="fName" required />
      </div>
      <div style={pages === 0 ? visible : invisible}>
        <label htmlFor="lName">Last Name</label>
        <input type="text" id="lName" name="lName" required />
      </div>
      <div style={pages === 0 ? visible : invisible}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div style={pages === 0 ? visible : invisible}>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" required />
      </div>
      <div style={pages === 0 ? visible : invisible}>
        <label htmlFor="cPassword">Confirm Password</label>
        <input type="text" id="cPassword" name="cPassword" required />
      </div>
      <div style={pages === 1 ? visible : invisible}>
        <label htmlFor="organization">organization</label>
        <input type="text" id="organization" name="organization" required />
      </div>
      <div style={pages === 1 ? visible : invisible}>
        <label htmlFor="department">Department</label>
        <input type="text" id="department" name="department" required />
      </div>

      {pages === 0
        ? <button type='button' onClick={() => setPages(pages + 1)}>Next</button>
        : <button type='button' onClick={() => setPages(pages - 1)}>Prev</button>
      }
      {pages === 1 && <div><button type='submit'>Submit</button></div>}
    </div>
  )
}
