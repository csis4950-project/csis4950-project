import { getShiftsByUserDepartments } from '@/utils/db';
import { getSession } from '@/utils/session';
import Calendar from '@/app/user/calendar/Calendar';

export default async function CalendarPage() {
  const { payload: session } = await getSession();
  const shifts = await getShiftsByUserDepartments(session.departments);

  return (
    <section className='calendar'>
      <h3>Calendar</h3>
      <Calendar session={session} shifts={shifts} />
    </section>
  )
}