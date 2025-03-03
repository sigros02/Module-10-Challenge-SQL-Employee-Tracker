INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');
       
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 100000, 4),
       ('Lead Engineer', 160000, 1),
       ('Software Engineer', 120000, 1),
       ('Account Manager', 150000, 2),
       ('Accountant', 160000, 2),
       ('Legal Team Lead', 250000, 3),
       ('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 6, NULL);


