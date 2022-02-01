-- department
INSERT INTO department (id, name)
VALUES (001, 'Engineering'),
       (002, 'Finance'),
       (003, 'Legal');
 
-- roles 
INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Software Engineer", 70000, 1),
       (002, "Lead Engineer", 120000, 2),
       (003, "Accountant", 70000, 3);
 
-- employee 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, 'John', 'Wick', 002),
       (002, 'Joe', 'Schmoe', 001, 1),
       (003, 'Emily', 'Simile', 003, 2);
 