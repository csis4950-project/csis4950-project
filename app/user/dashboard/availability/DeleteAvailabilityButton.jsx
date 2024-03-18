"use client"

import { deleteAvailability } from "@/utils/actions"

export default function DeleteAvailabilityButton({ availabilityId }) {
  return (
    <form action={deleteAvailability}>
      <input type="hidden" name="availabilityId" value={availabilityId ?? "no-data"} />
      <button className="btn btn--deny btn--no-border" type="submit">DELETE</button>
    </form >
  )
}