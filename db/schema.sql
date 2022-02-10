DROP DATABASE db;

CREATE DATABASE db;

USE db;

DROP department;
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);
 
DROP TABLE roles;
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE SET NULL
);
 
DROP TABLE employee;
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
 
UPDATE [LOW_PRIORITY] [IGNORE] employee 
SET 
    column_name1 = expr1,
    column_name2 = expr2,
[WHERE
    condition]; 
 