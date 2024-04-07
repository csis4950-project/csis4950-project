"use client"

import { useRef, useState } from "react";
import InviteUserButton from "./InviteUserButton";
import CreateDepartmentFrom from "./CreateDepartmentForm";
import DeleteUserButton from "./DeleteUserButton";
import ChangeRoleButton from "./ChangeRoleButton";

export default function EmployeeList({ curOrg, departments, employees, isOwner, roles }) {
  const [department, setDepartment] = useState(departments[0]?.name);
  const ref = useRef();

  function handleRef(newDepartmentName) {
    if (department > newDepartmentName) {
      ref.current.selectedIndex += 1;
    }
  }

  return (
    <div>
      {isOwner && <CreateDepartmentFrom curOrg={curOrg} handleRef={handleRef} />}
      <div className="group">
        <div>
          <label htmlFor="department">Department: </label>
          <select ref={ref} id="department" className="group__select" onChange={(e) => { setDepartment(e.target.value) }}>
            {
              departments.length !== 0
                ? departments.map((department, index) => {
                  return <option key={index} value={department.name}>{department.name}</option>
                })
                : <option value="">No Departments</option>
            }
          </select>
        </div>
        <InviteUserButton curOrg={curOrg} departments={departments} />
      </div>
      <table className="table">
        <thead>
          <tr className="table__row--size-head">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((employee, index) => {
              if (employee.department.name === department) {
                const fullName = `${employee.member.firstName} ${employee.member.lastName}`;
                return (
                  <tr key={index} className="table__row--size-body">
                    <td className="table__cel">{fullName}</td>
                    <td className="table__cel">{employee.member.email}</td>
                    <td className="table__cel">{employee.role.name.toUpperCase()}</td>
                    <td className="table__cel table__cel--btns">
                      {/* <div>
                        <button>MOVE</button>
                      </div> */}
                      <div>
                        <ChangeRoleButton departmentMemberId={employee.id} roles={roles} />
                      </div>
                      <div>
                        <DeleteUserButton departmentMemberId={employee.id} />
                      </div>
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </div>
  )
}