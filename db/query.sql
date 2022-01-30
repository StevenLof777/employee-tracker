SELECT *
FROM roles
JOIN department ON roles.department = department.id;

DROP TABLE department;
DROP TABLE roles;
DROP TABLE employee;

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;