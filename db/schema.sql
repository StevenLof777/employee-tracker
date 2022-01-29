DROP DATABASE IF EXISTS db;
CREATE DATABASE db;

USE _db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name_ VARCHAR(30) NOT NULL
);

CREATE TABLE role_ (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (department_id),
    REFERENCES department(id),
    FOREIGN KEY (manager_id),
    REFERENCES manager(id),
    ON DELETE SET NULL
);
