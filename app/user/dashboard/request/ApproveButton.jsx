"use client"

import { approveRequest } from "@/utils/actions"

export default function ApproveButton({ requestId }) {
  return (
    <form action={approveRequest}>
      <input type="hidden" name="requestId" value={requestId} />
      <button className="btn btn--approve btn--no-border" type="submit">APPROVE</button>
    </form >
  )
}