import inquirer from "inquirer";
import Employee from "./Employee.js";
import { selectAllEmployees, insertEmployee } from "../server.js";

class Cli {
  employees: Employee[];

  constructor() {
    this.employees = [];
  }

  buildEmployeesArray(): Promise<void> {
    return selectAllEmployees()
      .then((employees) => {
        this.employees = employees;
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }

  async viewEmployees(): Promise<void> {
    await this.buildEmployeesArray();
    console.table(this.employees);
    this.startCli();
  }

  createEmployee(): void {
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
        const employee = new Employee(
          answers.firstName,
          answers.lastName,
          answers.roleID,
          answers.managerID
        );
        this.employees.push(employee);
        // console.log(this.employees);
        this.startCli();
      });
  }

  startCli(): void {
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
        } else if (answers.Options === "Create a new employee") {
          this.createEmployee();
        }
      });
  }
}

export default Cli;
