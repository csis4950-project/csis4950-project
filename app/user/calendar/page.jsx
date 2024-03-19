import { getShiftsByUserDepartments } from '@/utils/db';
import { getSession } from '@/utils/session';
import { hasAdminPermission } from '@/utils/utils';
import Calendar from '@/app/user/calendar/Calendar';

export default async function CalendarPage() {
  const { payload: session } = await getSession();
  const shifts = await getShiftsByUserDepartments(session.departments);
  const isAdmin = hasAdminPermission(session.departments);

  return (
    <section className='calendar'>
      <h3>Calendar</h3>
      <Calendar session={session} shifts={shifts} isAdmin={isAdmin} />
    </section>
  )
}