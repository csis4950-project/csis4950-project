import { checkIfOwner, getDepartmentsByOrgId, getDepartmentsByUserId, getDepartmentMemberByDepartments } from "@/utils/db";
import { getSession } from "@/utils/session"
import CreateDepartmentFrom from "./CreateDepartmentForm";
import EmployeeList from "./EmployeeList";

export default async function Departments() {
  const { payload: session } = await getSession();
  const { currentOrganization, userId } = session;
  const isOwner = await checkIfOwner(currentOrganization.id, userId);
  const departments = isOwner ? await getDepartmentsByOrgId(currentOrganization.id) : await getDepartmentsByUserId(userId);
  const employees = await getDepartmentMemberByDepartments(departments);

  // console.log('session', session);
  // console.log('isOwner', isOwner);
  // console.log('departments', departments);
  console.log('employees', employees);
  return (
    <section className="departments">
      <div>
        <h3>Departments</h3>
        {isOwner && <CreateDepartmentFrom />}
      </div>
      <EmployeeList departments={departments} employees={employees} />
    </section>
  )
}