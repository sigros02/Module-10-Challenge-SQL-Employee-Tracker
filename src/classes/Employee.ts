// import Vehicle from "./Vehicle.js";

class Employee {
  firstName: string;
  lastName: string;
  roleID: number;
  managerID: number;

  constructor(
    firstName: string,
    lastName: string,
    roleID: number,
    managerID: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleID = roleID;
    this.managerID = managerID;
  }
}

export default Employee;
