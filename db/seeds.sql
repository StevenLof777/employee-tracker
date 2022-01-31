INSERT INTO department (id, name)
VALUES (001, 'Engineering'),
       (002, 'Finance'),
       (003, 'Legal');
       
INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Software Engineer", 70000, 1),
       (002, "Lead Engineer", 120000, 2),
       (003, "Accountant", 70000, 3);

INSERT INTO employee (id, first_name, last_name)
VALUES (001, 'John', 'Wick'),
       (002, 'Joe', 'Schmoe'),
       (003, 'Emily', 'Simile');-