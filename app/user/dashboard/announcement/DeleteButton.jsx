"use client"

import { deleteAnnouncement } from "@/utils/actions";
import { icons } from "@/utils/icons";

export default function DeleteButton({ announcementId }) {
  return (
    <form action={deleteAnnouncement}>
      <input type="hidden" name="announcementId" value={announcementId} />
      <button type="submit" className="btn btn--deny"><span>{icons["delete"]}</span></button>
    </form >
  )
}