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

  return (
    <section className="departments">
      <div>
        <h3>Departments</h3>
      </div>
      <EmployeeList curOrg={currentOrganization} departments={departments} employees={employees} isOwner={isOwner} />
    </section>
  )
}