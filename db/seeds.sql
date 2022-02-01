-- department
INSERT INTO department (id, department)
VALUES (001, 'Engineering'),
       (002, 'Finance'),
       (003, 'Legal');
 
-- roles 
INSERT INTO roles (id, department_id, title, salary)
VALUES (001, 001, "Software Engineer", 70000),
       (002, 001, "Lead Engineer", 120000),
       (003, 003, "Accountant", 70000);
 
-- employee 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, 'John', 'Wick', 002, NULL),
       (002, 'Joe', 'Schmoe', 001, 1),
       (003, 'Emily', 'Simile', 003, 2);
00