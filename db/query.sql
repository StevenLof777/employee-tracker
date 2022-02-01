SELECT *
FROM roles
JOIN department ON roles.department = department.id;

-- remember process exit(0)

-- View all departments

SELECT * FROM department;
 
-- View all roles

SELECT department.id, roles.title, roles.salary
FROM roles
JOIN department 
ON roles.department_id = department.id;
 
-- View all employees

USE db;
-- SELECT employee.id, employee.first_name, employee.last_name,
-- roles.department_id , roles.title, roles.salary, department.name, employee.manager_id 
SELECT *
FROM employee
JOIN roles
    ON employee.id = roles.id
JOIN  department
    ON employee.id = department.id;
 
-- Add department
USE db;
INSERT INTO department (name)
  VALUES ("Human Resources");

