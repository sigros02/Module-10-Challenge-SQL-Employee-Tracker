import express, { Request, Response } from "express";
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

export const selectAllEmployees = async (): Promise<any[]> => {
  try {
    const result: QueryResult = await pool.query("SELECT * FROM employee");
    return result.rows;
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
