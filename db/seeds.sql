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
VALUES ('John', 'Doe', 6, NULL),('mike', 'smith', 3, 2),('sara', 'wilson', 1, 1),('laura', 'jones', 2, 3),('james', 'jackson', 5, 4),('jennifer', 'brown', 4, 5),('james', 'jones', 7, 6);
