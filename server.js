const express = require('express');
const { type } = require('express/lib/response');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 6420;
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

db.connect(function (err) {
    if (err) throw err;
    promptUser();
  });

// View all departments
const viewDept = () => {
    db.query(
        `
        SELECT * FROM department;
        `
        , function (err, results) {
            console.table(results);
            promptUser();
    }); 
};
   
// View all roles
const viewRoles = () => {
    db.query(
        `
        SELECT roles.id, roles.title, roles.salary, roles.department_id
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
    db.promise().query(
    `
        SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, employee.manager_id
    FROM employee
    JOIN roles
        ON employee.role_id = roles.id
    JOIN  department
        ON employee.id = department.id;
    `
    )
  .then( ([rows,fields]) => {
    console.table(rows);
  })
  .catch(console.log)
  .then( () => promptUser());
};

// Add a department
const addDept = () => {
    console.log('Successfully calls addDept');
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
};

// Add a role
const addRole = () => {
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
        message: 'Which department_id does this role belong to?'
        }
    ]).then((answers) => {
        db.promise().query(            
            `
            INSERT INTO roles (department_id, title, salary)
            VALUES ("${answers.dept}", "${answers.title}", ${answers.salary});
            `).then( ([rows, fields]) => {
              viewRoles();
            })
            .catch(console.log)
    })
};

// Add an employee
const addEmp = () => {
    return inquirer.prompt([
        {
        type: 'input',
        name: 'fn',
        message: 'What is the new employee\'s first name?'
        },
        {
        type: 'input',
        name: 'ln',
        message: 'What is the new employee\'s last name?'
        },
        {
        type: 'number',
        name: 'role',
        message: 'What is the employee\'s role_id?'
        },
        {
        type: 'number',
        name: 'manager',
        message: 'Who is the manager of this employee?'
        }
    ]).then((answers) => {
        console.log(answers)  
        db.promise().query(   
                   
            `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${answers.fn}", "${answers.ln}", ${answers.role}, ${answers.manager});
            `).then( ([rows, fields]) => {
              viewEmp();
            })
            .catch(console.log)
    })
};

// Update an employee's role
// ===================================================================================
const updateEmp = () => {
    db.promise().query(
        "SELECT * FROM employee"
    ).then( ([rows,fields]) => {
        let names = []
        return inquirer.prompt([
            {
            type: 'list',
            choices: () => {
                rows.forEach((employee)=>{
                    names.push(`${employee.first_name} ${employee.last_name}`)
                })
                return names;
            },
            name: 'employee',
            message: "Which employees' role would you like to update?"
            }
        ]
    ).then((answers) => {
    db.promise().query(            
        `
        SELECT employee.id, employee.first_name, employee.last_name
        FROM employee
        JOIN roles
            ON employee.role_id = roles.id
        JOIN  department
            ON employee.id = department.id;
        `
    ).then( ([rows, fields]) => {
        // Last Name
        let ln = answers.employee.split(' ')[1];
        
        let rolesArr = [];     
        return inquirer.prompt([
            {
             type: 'list',
             name: 'role_id',
             choices: () => {
                 rows.forEach((roles) => {
                     rolesArr.push(`${roles.id}`)
                 })
                 return rolesArr
             }  
            //  Grab role title 
        //     type: 'list',
        //     choices: () => {
        //         rows.forEach((roles)=>{
        //             rolesArr.push(`${roles.title}`)
        //         })
        //         return rolesArr;
        //     },
        // name: 'role_id',
        // message: "What role_id should this employee have?"
        },
    ]).then((answers) => {
        console.log(answers)
        db.promise().query(
           `
           UPDATE employee 
            SET 
                role_id = ${answers.role_id}
            WHERE
                last_name = "${ln}"; 
           ` 
        ).then(viewEmp());    

    }).catch(console.log)
    })
    
    })
      .catch(console.log)
    //   .then( () => promptUser());
    });
}
// ===================================================================================

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
            case 'Add employee':
                addEmp();
                break;
            case 'Update employee role':
                updateEmp();
                break;
            default:
                return
        }
    })
}; 

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// get the client
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
//   .then( () => con.end());