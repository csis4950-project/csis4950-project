import { getDepartmentMemberByDepartments, getShiftsByUserDepartments, getTagsByTagType } from '@/utils/db';
import { getSession } from '@/utils/session';
import TempCalendar from './TempCalendar';

export default async function EditShifts() {
  const { payload: session } = await getSession();
  const shifts = await getShiftsByUserDepartments(session.departments);
  const users = await getDepartmentMemberByDepartments(session.departments);
  const shiftTags = await getTagsByTagType("shift");
  return (
    <section className='edit-shifts'>
      <h3>Edit Shifts</h3>
      <TempCalendar session={session} existingShifts={shifts} users={users} shiftTags={shiftTags} />
    </section>
  )
}