const inquirer = require('inquirer');
const mysql = require('msql2');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

db.connect(err => {
    if (err) throw err;
    console.log(err);
    console.log('Connected to the employee database.');
    start();
});

function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ])
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    db.end();
                    break;
            }
        });
}

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?'
            }
        ])
        .then((answer) => {
            db.query('INSERT INTO department SET ?', { name: answer.department }, function (err, results) {
                if (err) throw err;
                console.log('Department added.');
                start();
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department ID of the role?'
            }
        ])
        .then((answer) => {
            db.query('INSERT INTO role SET ?', { title: answer.role, salary: answer.salary, department_id: answer.department_id }, function (err, results) {
                if (err) throw err;
                console.log('Role added.');
                start();
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {

            }
        ])
}