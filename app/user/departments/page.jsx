import { getDepartmentsByOrgId, getDepartmentsByUserId, getDepartmentMemberByDepartments, getRoles } from "@/utils/db";
import { getSession } from "@/utils/session"
import EmployeeList from "./EmployeeList";
import { getManageableDepartments, hasOwnerPermission } from "@/utils/utils";

export default async function Departments() {
  const { payload: session } = await getSession();
  const { currentOrganization } = session;
  const isOwner = hasOwnerPermission(session.departments);
  const departments = isOwner
    ? await getDepartmentsByOrgId(currentOrganization.id)
    : getManageableDepartments(session.departments);
  const employees = await getDepartmentMemberByDepartments(departments);
  const roles = await getRoles();

  return (
    <section className="departments">
      <div>
        <h3>Departments</h3>
      </div>
      <EmployeeList curOrg={currentOrganization} departments={departments} employees={employees} isOwner={isOwner} roles={roles} />
    </section>
  )
}