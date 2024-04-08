"use client"

import { deleteDepartmentMember } from "@/utils/actions"

export default function DeleteUserButton({ departmentMemberId }) {
  return (
    <form action={async (formData) => {
      await deleteDepartmentMember(formData);
    }}>
      <input type="hidden" name="departmentMemberId" value={departmentMemberId} />
      <button className="btn btn--deny btn--no-border" type="submit">DELETE</button>
    </form >
  )
}