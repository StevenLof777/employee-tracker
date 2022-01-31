const express = require('express');
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

// View all departments
const viewDept = () => {
    db.query(
        `
        SELECT * FROM department;
        `, function (err, results) {
            console.table(results);
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
            // console.log(results);
    });
         
}

// View all employees
const viewEmp = () =>{
    db.query(
        `
        USE db;
        SELECT employee.id, employee.first_name, employee.last_name,
        roles.department_id, roles.title, roles.salary, department.name, employee.manager_id 
        FROM employee
        JOIN roles
            ON employee.id = roles.id
        JOIN  department
            ON employee.id = department.id;        
        `, function (err, results) {
            console.log(results);
    });
};


const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ],
            name: 'view',
            message: 'What would you like to pick?'
        }
    ]).then((answers) => {
        console.log(answers);
        switch(answers.view) {
            case 'View all employees':
                viewDept();
                break;
            case 'View all departments':
                default:
                console.log('view employee does not work');
                // viewDept();
                promptUser();  
        }
    })
}; 

promptUser();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
