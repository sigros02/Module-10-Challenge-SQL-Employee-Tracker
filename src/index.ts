import Employee from "./classes/Employee.js";
import Cli from "./classes/Cli.js";

const employees = [];

const employee = new Employee("John", "Doe", 1, 1);

employees.push(employee);
console.log(employees);

// const cli = new Cli(employees);

// cli.startCli();
