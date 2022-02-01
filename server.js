const express = require('express');
const { type } = require('express/lib/response');
const inquirer = require('inquirer');
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
//   console.log(`Connected to the database.`)
);

db.connect(function (err) {
    if (err) throw err;
    promptUser();
  });

// View all departments
const viewDept = () => {
    db.query(
        `
        SELECT * FROM department;
        `, function (err, results) {
            console.table(results);
            promptUser();
    }); 
};
   
// View all roles
const viewRoles = () => {
    db.query(
        `
        SELECT department.id, roles.title, roles.salary
        FROM roles
        JOIN department 
        ON roles.department_id = department.id;
        `, function (err, results) {
            console.table(results);
            promptUser();
    });
         
}

// View all employees
// Doesn't work
// const viewEmp = () =>{
//     db.query(
//         `
//         USE db;
//         SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name, employee.manager_id
//         FROM employee
//         JOIN roles
//             ON employee.id = roles.id
//         JOIN  department
//             ON employee.id = department.id;               
//         `, function (err, results) {
//             console.table(results);
//             promptUser();
        
//     });
// };

// View all employees
// Doesn't work
// const viewEmp = () =>{
//     db.promise().query(`
//     SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name, employee.manager_id
//     FROM employee
//     JOIN roles
//         ON employee.id = roles.id
//     JOIN  department
//         ON employee.id = department.id;
//     `)
//   .then( ([rows,fields]) => {
//     console.table(rows);
//   })
//   .catch(console.log)
//   .then( () => promptUser());
// };

// View All employees
// Works
const viewEmp = () =>{
    db.promise().query("SELECT * FROM employee")
  .then( ([rows,fields]) => {
    console.table(rows);
  })
  .catch(console.log)
  .then( () => promptUser());
};

// Add a department
const addDept = () => {
    console.log('Succesfully calls addDept');
    return inquirer.prompt([
        {
        type: 'input',
        name: 'deptName',
        message: 'What is the name of your new department?'
        },
    ]).then((answers) => {
        db.promise().query(            
        `
        INSERT INTO department (department)
        VALUES ("${answers.deptName}")      
        `).then( ([rows, fields]) => {
          viewDept();
        })
        .catch(console.log)
    })
}

// Add a role
const addRole = () => {
    console.log('Succesfully calls addRole');
    return inquirer.prompt([
        {
        type: 'input',
        name: 'title',
        message: 'What is the new role?'
        },
        {
        type: 'number',
        name: 'salary',
        message: 'What is salary for the new role?'
        },
        {
        type: 'number',
        name: 'dept',
        message: 'Which department does this role belong to?'
        },
    ]).then((answers) => {
        console.log(answers.title)
        db.promise().query(            
            `
            INSERT INTO roles (title)
            VALUES ("${answers.title}");      
            `).then( ([rows, fields]) => {
              viewRoles();
            })
            .catch(console.log)
    })
}

// Init prompt
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee role',
                'Quit'
            ],
            name: 'view',
            message: 'What would you like to do?'
        }
    ]).then((answers) => {
        switch(answers.view) {
            case 'View all departments':
                viewDept();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmp();
                break;
            case 'Add department':
                addDept();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Update employee role':
                updateEmp();
                break;
            default:
                console.log('default')
        }
    })
}; 

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




// // get the client
// const mysql = require('mysql2');
// // create the connection-
// const con = mysql.createConnection(-
//   {host:'localhost', user: 'root', database: 'test'}-
// );-
// db.promise().query("SELECT 1")-
//   .then( ([rows,fields]) => {-
//     console.log(rows);-
//   })-
//   .catch(console.log)-
//   .then( () => con.end());-