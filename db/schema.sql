-- Active: 1740443734143@@127.0.0.1@5432@staff_db
DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE Table role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INTEGER NOT NULL,
  Foreign Key (department_id) REFERENCES department(id)
);


CREATE Table employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  Foreign Key (role_id) REFERENCES role(id),
  Foreign Key (manager_id) REFERENCES employee(id)
);