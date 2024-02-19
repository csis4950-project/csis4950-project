"use client"
import { useState } from "react"

export default function SignUpInputField({ error }) {
  const [pages, setPages] = useState(0);
  const visible = { display: "block" }
  const invisible = { display: "none" }

  return (
    <div className="sign-up-input-field">
      {pages === 0
        ? <div className="mb-24">
          <h4>Organization Owner Registration</h4>
        </div>
        : <div className="mb-24">
          <h4>Organization Registration</h4>
        </div>
      }
      <div className="input-field-layout">
        <div className="field-row field-row--two-items">
          <div className="input-field" style={pages === 0 ? visible : invisible}>
            <div className="mb-12">
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input">
              <input type="text" id="firstName" name="firstName" />
              {error && <span className="error-message">{error.firstName}</span>}
            </div>
          </div>
          <div className="input-field" style={pages === 0 ? visible : invisible}>
            <div className="mb-12">
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="input">
              <input type="text" id="lastName" name="lastName"></input>
              {error && <span className="error-message">{error.firstName}</span>}
            </div>
          </div>
        </div>
        <div className="field-row field-row--one-item">
          <div className="input-field" style={pages === 0 ? visible : invisible}>
            <div className="mb-12">
              <label htmlFor="email">Email</label>
            </div>
            <div className="input">
              <input type="email" id="email" name="email"></input>
              {error && <span className="error-message">{error?.email}</span>}
            </div>
          </div>
        </div>
        <div className="field-row field-row--two-items">
          <div className="input-field" style={pages === 0 ? visible : invisible}>
            <div className="mb-12">
              <label htmlFor="password">Password</label>
            </div>
            <div className="input">
              <input type="password" id="password" name="password"></input>
              {error && <span className="error-message">{error?.password}</span>}
            </div>
          </div>
          <div className="input-field" style={pages === 0 ? visible : invisible}>
            <div className="mb-12">
              <label htmlFor="cPassword">Confirm Password</label>
            </div>
            <div className="input">
              <input type="password" id="cPassword" name="cPassword"></input>
            </div>
          </div>
        </div>
        <div className="field-row field-row--one-item">
          <div className="input-field" style={pages === 1 ? visible : invisible}>
            <div className="mb-12">
              <label htmlFor="organization">Organization Name</label>
            </div>
            <div className="input">
              <input type="text" id="organization" name="organization"></input>
              {error && <span className="error-message">{error?.organization}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="btns">
        {pages === 0
          ? <button type='button' className="btn btn--next" onClick={() => setPages(pages + 1)}>Next</button>
          : <button type='button' className="btn btn--prev" onClick={() => setPages(pages - 1)}>Prev</button>
        }
        {pages === 1 && <button type='submit' className="btn btn--sign-up">Submit</button>}
      </div>
      {error && <div><span className="error-message">{error?.message}</span></div>}
      {/* {error && <span className="error-message">{error?.message}</span>} */}
    </div>
  )
}
