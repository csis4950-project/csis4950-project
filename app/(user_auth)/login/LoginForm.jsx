"use client"

import { useState } from "react";
import { login } from "@/utils/actions";
import Link from "next/link";

export default function LoginFrom() {
  const [error, setError] = useState("");
  return (
    <form action={async (formData) => {
      try {
        await login(formData);
      } catch (e) {
        setError(e.message);
      }
    }}>
      <div className="input-field">
        <div className="mb-12">
          <label htmlFor="email">Email</label>
        </div>
        <div className="input">
          <input type="email" id="email" name="email" required></input>
        </div>
      </div>
      <div className="input-field">
        <div className="mb-12">
          <label htmlFor="password">password</label>
        </div>
        <div className="input">
          <input type="password" id="password" name="password" required></input>
        </div>
      </div>
      <div className="flex flex--right mb-24">
        <Link className="link link__forget-password link--black-500" href="/">Forgot password?</Link>
      </div>
      {error && <span className="error-message">{error}</span>}
      <button className="btn--login" type="submit"><span>Login</span></button>
    </form>
  );
}