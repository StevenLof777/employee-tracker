const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'CODE',
    database: 'db'
  },
  console.log(`Connected to the database.`)
);

// db.query('SELECT * FROM department', function (err, results) {
//     if (err) {
//         console.log(err);
//       }
//       console.log(result);
//   });

db.query(
`
SELECT department.id, roles.title, roles.salary
FROM roles
JOIN department 
ON roles.department_id = department.id;
`, function (err, results) {
    console.log(results);
  });

app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });