"use client"

import { cancelRequest } from "@/utils/actions"

export default function CancelButton({ requestId }) {
  return (
    <form action={cancelRequest}>
      <input type="hidden" name="requestId" value={requestId} />
      <button className="btn btn--cancel btn--no-border" type="submit">CANCEL</button>
    </form >
  )
}