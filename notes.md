# Notes

## Create and select bases: Unit 12 act 3
```
CREATE DATABASE inventory_db;

-- Create two new databases --
DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;

-- Use inventory_db --
USE inventory_db;

-- See database in use --
SELECT DATABASE();

```

## Columns
```
-- Creates the table "produce" within inventory_db --
CREATE TABLE produce (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(100) NOT NULL
);
```

## Inserting values from other places Unit 12 Act 7
```
-- Insert multiple produce items --
INSERT INTO produce (id, name)
VALUES
    ( 1, "apple"),
    ( 2, "orange"),
    ( 3, "banana");
```

## How to see what is inside the db Unit 12 Act 7
### A better example can be found in unit 12 act 8
```
SELECT * FROM produce;

-- Check if Database in Use ---
SELECT DATABASE();
```

## Delete and update items: Unit 12 Act 9
```
DELETE FROM produce
WHERE id = 2;

UPDATE produce
SET name = "strawberry"
WHERE id = 1;
```

## Connect server.js to db: Unit 12 act 11
```
Make sure to import mysql
const mysql -require('mysql')

//Connect to db
const pikachu = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'CODE',
    database: 'your_db'
  },
  console.log(`Connected to the your_db database.`)
);

// Query database
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

That console.log should return an array with objects about the content.
```

## How to make sure columns only receive one type of data: Unit 12 act 13
```
CREATE TABLE courses (
  id INT NOT NULL,
  course_title VARCHAR(30) NOT NULL,
  course_description TEXT NOT NULL,
  active BOOLEAN NOT NULL,
  date_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

## What a seed file should look like: Unit 12 act 17
```
<!-- It is inserting the values INTO the courses table. -->
INSERT INTO courses (id, course_title, course_description, active)
VALUES (001, "Algebra I", "Linear equations, inequalities, functions, and graphs", true),
       (002, "Pre-Calculus", "Polynomials, Complex Numbers, Vectors", true),
       (003, "Calculus I", "Limits, Differentiation, Derivatives", true),
       (004, "Euclidean Geometry", "Intuitively Appealing Axioms Galore", false);
       <!-- Each items with an parentheses is an table -->
```