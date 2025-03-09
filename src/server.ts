import express, { json, Request, Response } from "express";
import { QueryResult } from "pg";
import { pool, connectToDb } from "./connection.js";

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const selectAllEmployees = async (): Promise<{ rows: any[] }> => {
  try {
    const result: QueryResult = await pool.query(
      `SELECT 
        E.Id AS employeeID, 
        E.first_name AS firstName, 
        E.last_name AS lastName,  
        R.title AS title, 
        D.name AS department, 
        R.salary AS salary,
        E.manager_id AS managerID,
        COALESCE(CONCAT(M.first_name, ' ', M.last_name), 'No Manager') AS managerName
      FROM employee E
        INNER JOIN role R ON E.role_id = R.id
        INNER JOIN department D ON R.department_id = D.id
        LEFT JOIN employee M ON E.manager_id = M.id
        ORDER by E.id`
    );
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve employees");
  }
};

export const insertEmployee = async (
  firstName: string,
  lastName: string,
  roleID: number,
  managerID: number
): Promise<void> => {
  try {
    await pool.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
      [firstName, lastName, roleID, managerID]
    );
    console.log("Employee added successfully");
  } catch (err) {
    console.error(err);
  }
};

export const updateEmployeeRole = async (
  employeeID: string,
  roleID: number
): Promise<void> => {
  try {
    console.log(`++++++++++++++++++++++++++++++++++++++++++`);
    console.log(`employeeID: ${employeeID}}, roleID: ${roleID}`);
    await pool.query(
      `UPDATE employee
        SET role_id = $2
      WHERE 
        id = $1`,
      [employeeID, roleID]
    );
    console.log("Employee role updated successfully");
  } catch (err) {
    console.error(err);
  }
};

export const selectAllRoles = async (): Promise<{ rows: any[] }> => {
  try {
    const result: QueryResult = await pool.query(
      `SELECT 
        R.id as id,
        R.title as title,
        D.name AS department,
        R.salary as salary
      FROM role R
        INNER JOIN department D ON R.department_id = D.id`
    );
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve roles");
  }
};

export const insertRole = async (
  title: string,
  salary: number,
  departmentID: number
): Promise<void> => {
  try {
    await pool.query(
      "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
      [title, salary, departmentID]
    );
    console.log("Role added successfully");
  } catch (err) {
    console.error(err);
  }
};

export const selectAllDepartments = async (): Promise<{ rows: any[] }> => {
  try {
    const result: QueryResult = await pool.query(
      `SELECT 
        D.id as id,
        D.name AS department
      FROM department D`
    );
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve roles");
  }
};

export const insertDepartment = async (department: string): Promise<void> => {
  try {
    // console.log(`++++++++++++++++++++++++++++++++++++++++++`);
    // console.log(`department: ${department}}`);
    await pool.query("INSERT INTO department (name) VALUES ($1)", [department]);
    console.log("Department added successfully");
  } catch (err) {
    console.error(err);
  }
};
