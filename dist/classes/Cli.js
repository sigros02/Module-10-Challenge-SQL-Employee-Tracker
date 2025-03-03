import inquirer from "inquirer";
import Employee from "./Employee";
// import Employee from "./classes/Employee.js";
class Cli {
    constructor(employees) {
        this.exit = false;
        this.employees = employees;
    }
    viewEmployees() {
        console.log(this.employees);
        this.startCli();
    }
    createEmployee() {
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
                type: "input",
                name: "roleID",
                message: "Enter the employee's role ID",
            },
            {
                type: "input",
                name: "managerID",
                message: "Enter the employee's manager ID",
            },
        ])
            .then((answers) => {
            const employee = new Employee(answers.firstName, answers.lastName, answers.roleID, answers.managerID);
            this.employees.push(employee);
            console.log(this.employees);
            this.startCli();
        });
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
