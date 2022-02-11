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

SELECT * FROM employee;

USE db;
SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, employee.manager_id
FROM employee
JOIN roles
    ON employee.role_id = roles.id
JOIN  department
    ON employee.id = department.id;
 
-- Add department

USE db;
INSERT INTO department (name)
  VALUES ("Human Resources");

UPDATE employee 
SET 
    role_id = "3"
WHERE
    last_name = "Wick"; 
  



UPDATE employee 
JOIN roles
    ON employee.id = roles.id
SET 
    role.title = "HR Manaer"
WHERE
    last_name = "Wick"; 
  