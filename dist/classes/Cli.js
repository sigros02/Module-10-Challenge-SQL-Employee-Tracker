import inquirer from "inquirer";
import Employee from "./Employee.js";
import Role from "./role.js";
import Department from "./department.js";
import { selectAllEmployees, insertEmployee, selectAllRoles, insertRole, selectAllDepartments, insertDepartment, } from "../server.js";
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
            console.log("\n");
            // const employees = await this.buildEmployeesArray();
            // console.table(employees.map((employee) => employee.toArray()));
        }
        catch (error) {
            console.error("Error fetching employees:", error);
        }
        this.startCli();
    }
    async createManagerChoices() {
        let choices = [];
        try {
            const results = await selectAllEmployees();
            choices = results.rows.map((row, index) => {
                return {
                    name: `${index + 1}: ${row.firstname} ${row.lastname}`,
                    value: row.employeeid,
                };
            });
            // console.log(`***************************`);
            // console.log(choices);
        }
        catch (error) {
            console.log("error creating role choices", error);
        }
        return choices;
    }
    async createRoleChoices() {
        let choices = [];
        try {
            const results = await selectAllRoles();
            choices = results.rows.map((row, index) => {
                return { name: `${index + 1}: ${row.title}`, value: row.id };
            });
            // console.log(`***************************`);
            // console.log(choices);
        }
        catch (error) {
            console.log("error creating role choices", error);
        }
        return choices;
    }
    async createEmployeePrompt() {
        const managers = await this.createManagerChoices();
        const roles = await this.createRoleChoices();
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
                message: "Select the employee's title",
                choices: roles,
            },
            {
                type: "list",
                name: "managerID",
                message: "Select the employee's manager",
                choices: managers,
            },
        ])
            .then((answers) => {
            this.createEmployeeFromAnswers(answers);
        });
    }
    async createEmployeeFromAnswers(answers) {
        await insertEmployee(answers.firstName, answers.lastName, answers.roleID, answers.managerID);
        this.viewEmployees();
    }
    async viewRoles() {
        try {
            const result = await selectAllRoles();
            console.table(result.rows);
            console.log("\n");
        }
        catch (error) {
            console.error("Error fetching employees:", error);
        }
        this.startCli();
    }
    async createDepartmentChoices() {
        let choices = [];
        try {
            const results = await selectAllDepartments();
            choices = results.rows.map((row, index) => {
                return { name: `${index + 1}: ${row.department}`, value: row.id };
            });
            // console.log(`***************************`);
            // console.log(choices);
        }
        catch (error) {
            console.log("error creating department choices", error);
        }
        return choices;
    }
    async createRolePrompt() {
        const departments = await this.createDepartmentChoices();
        inquirer
            .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
            },
            {
                type: "list",
                name: "departmentID",
                message: "Which department does the role belong to?",
                choices: departments,
            },
        ])
            .then((answers) => {
            this.createRoleFromAnswers(answers);
        });
    }
    async createRoleFromAnswers(answers) {
        await insertRole(answers.title, answers.salary, answers.departmentID);
        this.viewRoles();
    }
    async viewDepartments() {
        try {
            const result = await selectAllDepartments();
            console.table(result.rows);
            console.log("\n");
        }
        catch (error) {
            console.error("Error fetching employees:", error);
        }
        this.startCli();
    }
    async createDepartmentPrompt() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "department",
                message: "What is the name of the department?",
            },
        ])
            .then((answers) => {
            this.createDepartmentFromAnswers(answers);
        });
    }
    async createDepartmentFromAnswers(answers) {
        await insertDepartment(answers.department);
        this.viewDepartments();
    }
    startCli() {
        inquirer
            .prompt([
            {
                type: "list",
                name: "Options",
                message: "What would you like to do?",
                choices: [
                    "View all employees",
                    "Create a new employee",
                    "View all roles",
                    "Create a new role",
                    "View all departments",
                    "Create a new department",
                ],
            },
        ])
            // I can make this a switch statement
            .then((answers) => {
            switch (answers.Options) {
                case "View all employees":
                    this.viewEmployees();
                    break;
                case "Create a new employee":
                    this.createEmployeePrompt();
                    break;
                case "View all roles":
                    this.viewRoles();
                    break;
                case "Create a new role":
                    this.createRolePrompt();
                    break;
                case "View all departments":
                    this.viewDepartments();
                    break;
                case "Create a new department":
                    this.createDepartmentPrompt();
                    break;
            }
            // if (answers.Options === "View all employees") {
            //   this.viewEmployees();
            // } else if (answers.Options === "Create a new employee") {
            //   this.createEmployeePrompt();
            // } else if (answers.Options === "View all roles") {
            //   this.viewRoles();
            // } else if (answers.Options === "Create a new role") {
            //   this.createRolePrompt();
            // } else if (answers.Options === "View all departments") {
            //   this.viewDepartments();
            // } else if (answers.Options === "Create a new department") {
            //   this.createDepartmentPrompt();
            // }
        });
    }
}
export default Cli;
