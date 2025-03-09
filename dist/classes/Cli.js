import inquirer from "inquirer";
import Employee from "./Employee.js";
import Role from "./role.js";
import Department from "./department.js";
import { selectAllEmployees, insertEmployee } from "../server.js";
class Cli {
    async buildEmployeesArray() {
        const result = await selectAllEmployees();
        return result.rows.map((row) => {
            const department = new Department(row.departmentid, row.department);
            const role = new Role(row.roleid, row.title, row.salary, department);
            return new Employee(row.employeeid, row.firstname, row.lastname, role, row.managerid, row.managername);
        });
    }
    async viewEmployees() {
        try {
            const result = await selectAllEmployees();
            console.table(result.rows, [
                "employeeid",
                "firstname",
                "lastname",
                "title",
                "department",
                "salary",
                "managername",
            ]);
            // const employees = await this.buildEmployeesArray();
            // console.log(`***************************`);
            // console.table(employees.map((employee) => employee.toArray()));
        }
        catch (error) {
            console.error("Error fetching employees:", error);
        }
        this.startCli();
    }
    async createEmployee() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter the employee's first name",
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter the employee's last name",
            },
            {
                type: "list",
                name: "roleID",
                message: "Enter the employee's role ID",
                choices: [
                    { name: "1: Salesperson", value: 1 },
                    { name: "2: Lead Engineer", value: 2 },
                    { name: "3: Software Engineer", value: 3 },
                    { name: "4: Account Manager", value: 4 },
                    { name: "5: Accountant", value: 5 },
                    { name: "6: Legal Team Lead", value: 6 },
                    { name: "7: Lawyer", value: 7 },
                ],
            },
            // Need to consider if this is the best way to handle manager ID
            // Should the manager ID be assigned somehow?
            {
                type: "input",
                name: "managerID",
                message: "Enter the employee's manager ID",
            },
        ])
            .then((answers) => {
            this.createEmployeeFromAnswers(answers);
        });
    }
    async createEmployeeFromAnswers(answers) {
        await insertEmployee(answers.firstName, answers.lastName, answers.roleID, answers.managerID);
        this.viewEmployees();
        this.startCli();
    }
    startCli() {
        inquirer
            .prompt([
            {
                type: "list",
                name: "Options",
                message: "What would you like to do?",
                choices: ["View all employees", "Create a new employee"],
            },
        ])
            // I can make this a switch statement
            .then((answers) => {
            if (answers.Options === "View all employees") {
                this.viewEmployees();
            }
            else if (answers.Options === "Create a new employee") {
                this.createEmployee();
            }
        });
    }
}
export default Cli;
