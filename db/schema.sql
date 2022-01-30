CREATE DATABASE db;

USE db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary INT
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
);

    FOREIGN KEY (department_id)
    REFERENCES department(id)


    FOREIGN KEY (department_id),
    REFERENCES department(id),
    FOREIGN KEY (manager_id),
    REFERENCES manager(id),