import Role from "./role.js";

// Class for Employee object
class Employee {
  employeeID: number;
  firstName: string;
  lastName: string;
  role: Role;
  managerID: number;
  managerName: string;

  constructor(
    employeeID: number,
    firstName: string,
    lastName: string,
    role: Role,
    managerID: number,
    managerName: string
  ) {
    this.employeeID = employeeID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.managerID = managerID;
    this.managerName = managerName;
  }

  toArray(): string[] {
    return [
      `${this.employeeID}`,
      this.firstName,
      this.lastName,
      ...this.role.toArray(),
      this.managerName,
    ];
  }
}

export default Employee;
