// Class for Employee object
class Employee {
    constructor(employeeID, firstName, lastName, role, managerID, managerName) {
        this.employeeID = employeeID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.managerID = managerID;
        this.managerName = managerName;
    }
    toArray() {
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
