"use client"

import { deleteAvailability } from "@/utils/actions"

export default function UnavailableButton({ availabilityId }) {
  return (
    <form action={deleteAvailability}>
      <input type="hidden" name="availabilityId" value={availabilityId ?? "no-data"} />
      <button className="btn btn--unavailable btn--no-border" type="submit">UNAVAILABLE</button>
    </form >
  )
}