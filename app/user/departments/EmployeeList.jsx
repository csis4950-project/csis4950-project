"use client"

import { useState } from "react";

export default function EmployeeList({ departments, employees }) {
  const [department, setDepartment] = useState(departments[0]?.name);
  // console.log(departments);
  // console.log(employees);


  return (
    <div>
      <div className="group">
        <div>
          <label htmlFor="department">Department: </label>
          <select id="department" className="group__select" onChange={(e) => setDepartment(e.target.value)}>
            {
              departments.length !== 0
                ? departments.map((department, index) => {
                  return <option key={index} value={department.name}>{department.name}</option>
                })
                : <option value="">No Departments</option>
            }
          </select>
        </div>
        <div>
          <button className="btn">INVITE</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr className="table__row--size-head">
            <th>No.</th>
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
                    <td className="table__cel">{index}</td>
                    <td className="table__cel">{fullName}</td>
                    <td className="table__cel">{employee.member.email}</td>
                    <td className="table__cel">{employee.role.name.toUpperCase()}</td>
                    <td className="table__cel">
                      <div>
                        <button>MOVE</button>
                      </div>
                      <div>
                        <button>CHANGE ROLE</button>
                      </div>
                      <div>
                        <button>DELETE</button>
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