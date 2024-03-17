"use client"

import { useState } from "react"
import { signUpUser, signUpUserWithExistingAccount } from "@/utils/actions";

export default function UserSignUpForm({ invitationData }) {
  const [hasAccount, setHasAccount] = useState(false);

  return (
    hasAccount ?
      <SignUpWithExistingAccountForm invitationData={invitationData} setHasAccount={setHasAccount} />
      :
      <SignUpForm invitationData={invitationData} setHasAccount={setHasAccount} />
  )
}

function SignUpForm({ invitationData, setHasAccount }) {
  const [error, setError] = useState("");
  return (
    <form action={async (formData) => {
      try {
        await signUpUser(formData);
      } catch (e) {
        setError(e.message)
      }
    }}>
      <div className="sign-up-input-field">
        <div className="mb-24">
          <h4>User Registration</h4>
        </div>
        <div className="company-info">
          <div>
            <span>Company Name: {invitationData.organization}</span>
          </div>
          <div>
            <span>Department Name: {invitationData.department}</span>
          </div>
        </div>
        <div className="input-field-layout">
          <div className="field-row field-row--two-items">
            <div className="input-field">
              <div className="mb-12">
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input">
                <input type="text" id="firstName" name="firstName" />
                {error.cause?.firstName && <span className="error-message">{error.cause.firstName}</span>}
              </div>
            </div>
            <div className="input-field">
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
            <div className="input-field">
              <div className="mb-12">
                <label htmlFor="email">Email</label>
              </div>
              <div className="input">
                <input type="email" id="email" name="email" autoComplete="email" />
                {error.cause?.email && <span className="error-message">{error.cause?.email}</span>}
              </div>
            </div>
          </div>
          <div className="field-row field-row--two-items">
            <div className="input-field">
              <div className="mb-12">
                <label htmlFor="password">Password</label>
              </div>
              <div className="input">
                <input type="password" id="password" name="password" autoComplete="new-password" />
                {error.cause?.password && <span className="error-message">{error.cause?.password}</span>}
              </div>
            </div>
            <div className="input-field">
              <div className="mb-12">
                <label htmlFor="cPassword">Confirm Password</label>
              </div>
              <div className="input">
                <input type="password" id="cPassword" name="cPassword" autoComplete="new-password" />
              </div>
            </div>
          </div>
        </div>
        <div className="btns btns--margin-narrow btns--right">
          <button className="btn" type="button" onClick={() => setHasAccount(true)}>Sign up with an existing account</button>
        </div>
        <div className="btns">
          <input type="hidden" name="departmentId" value={invitationData.departmentId} />
          <button type='submit' className="btn btn--sign-up">Submit</button>
        </div>
      </div>
    </form>
  )
}

function SignUpWithExistingAccountForm({ invitationData, setHasAccount }) {
  const [error, setError] = useState("");
  return (
    <form action={async (formData) => {
      try {
        await signUpUserWithExistingAccount(formData);
      } catch (e) {
        setError(e.message)
      }
    }}>
      <div className="sign-up-input-field">
        <div className="mb-24">
          <h4>User Registration</h4>
        </div>
        <div className="company-info">
          <div>
            <span>Company Name: {invitationData.organization}</span>
          </div>
          <div>
            <span>Department Name: {invitationData.department}</span>
          </div>
        </div>
        <div className="input-field-layout">
          <div className="field-row field-row--one-item">
            <div className="input-field">
              <div className="mb-12">
                <label htmlFor="email">Email</label>
              </div>
              <div className="input">
                <input type="email" id="email" name="email" autoComplete="email" />
              </div>
            </div>
          </div>
          <div className="field-row field-row--one-item">
            <div className="input-field">
              <div className="mb-12">
                <label htmlFor="password">Password</label>
              </div>
              <div className="input">
                <input type="password" id="password" name="password" autoComplete="new-password" />
              </div>
            </div>
          </div>
        </div>
        <div className="btns btns--margin-narrow btns--right">
          <button className="btn" type="button" onClick={() => setHasAccount(false)}>Create a new account</button>
        </div>
        <div className="btns">
          <input type="hidden" name="departmentId" value={invitationData.departmentId} />
          <button type='submit' className="btn btn--sign-up">Submit</button>
        </div>
        <div>
          <span className="error-message">{error}</span>
        </div>
      </div>
    </form>
  )
}