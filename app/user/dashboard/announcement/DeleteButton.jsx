"use client"

import { deleteAnnouncement } from "@/utils/actions"

export default function DeleteButton({ announcementId }) {
  return (
    <form action={deleteAnnouncement}>
      <input type="hidden" name="announcementId" value={announcementId} />
      <button type="submit">DELETE</button>
    </form >
  )
}