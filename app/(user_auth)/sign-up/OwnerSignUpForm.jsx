"use client"

import { useState } from "react"
import { signUpOwner } from "@/utils/actions";

const initialState = {
  message: "",
  cause: {}
}

export default function OwnerSignUpForm() {
  const [pages, setPages] = useState(0);
  const [error, setError] = useState(initialState);
  const visible = { display: "block" }
  const invisible = { display: "none" }

  return (
    <form action={async (formData) => {
      try {
        await signUpOwner(formData);
      } catch (e) {
        const error = JSON.parse(e.message);
        setError((prev) => {
          return {
            ...prev,
            message: error.message,
            cause: error.cause
          }
        })
      }
    }}>
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
                {error.cause?.firstName && <span className="error-message">{error.cause.firstName}</span>}
              </div>
            </div>
            <div className="input-field" style={pages === 0 ? visible : invisible}>
              <div className="mb-12">
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="input">
                <input type="text" id="lastName" name="lastName"></input>
                {error.cause?.lastName && <span className="error-message">{error.cause.lastName}</span>}
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
                {error.cause?.email && <span className="error-message">{error.cause?.email}</span>}
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
                {error.cause?.password && <span className="error-message">{error.cause?.password}</span>}
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
                {error.cause?.organization && <span className="error-message">{error.cause?.organization}</span>}
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
        {error.message && <div><span className="error-message">{error?.message}</span></div>}
      </div>
    </form>
  )
}