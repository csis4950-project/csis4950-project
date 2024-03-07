"use client"

import { denyRequest } from "@/utils/actions"

export default function DenyButton({ requestId }) {
  return (
    <form action={denyRequest}>
      <input type="hidden" name="requestId" value={requestId} />
      <button className="btn btn--deny btn--no-border" type="submit">DENY</button>
    </form >
  )
}