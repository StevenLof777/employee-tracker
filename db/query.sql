SELECT *
FROM roles
JOIN department ON roles.department = department.id;

-- remember process exit(0)

-- Quick deletions

DROP TABLE department;

DROP TABLE roles;

DROP TABLE employee;

-- View all departments

SELECT * FROM department;

-- View all roles

SELECT department.id, roles.title, roles.salary
FROM roles
JOIN department 
ON roles.department_id = department.id;

-- View all employees
SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id,
roles.department_id, roles.title, roles.salary, department.name 
FROM employee
JOIN roles
    ON employee.id = roles.id
JOIN  department
    ON employee.id = department.id;
  