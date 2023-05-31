const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!!',
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log(err);
    start();
    console.log('Connected to CMS Employee Database.');
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
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
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
                    connection.end();
                    break;
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
}

function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
        start();
    });
}

function viewAllRoles() {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
        start();
    });
}

function viewAllEmployees() {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n')
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the new department?',
                validate: function (value) {
                    let pass = value.match('^[a-zA-Z ]+$');
                    if (pass) {
                        return true;
                    } else {
                        return 'Please enter a valid department name.';
                    }
                }
            }
        ])
        .then((answer) => {
            connection.query('INSERT INTO department SET ?', { name: answer.department }, (err) => {
                if(err) throw err;
                console.log('\n')
                console.log('New department added successfully!');
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
                message: 'What is the name of the role?',
                validate: function (value) {
                    let pass = value.match('/^[a-zA-Z0-9 ]*$/');
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid salary.';
                },
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department ID of the role?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid department ID.';
                }
            }
        ])
        .then((answer) => {
            connection.query('INSERT INTO role SET ?', { title: answer.role, salary: answer.salary, department_id: answer.department_id }, (err) => {
                if (err) throw err;
                console.log('\n');
                console.log('New role added successfully!');
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?',
                validate: function (value) {
                    let pass = value.match('^[a-zA-Z ]+$');
                    if (pass) {
                        return true;
                    } else {
                        return 'Please enter a valid first name.';
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?',
                validate: function (value) {
                    let pass = value.match('^[a-zA-Z ]+$');
                    if (pass) {
                        return true;
                    } else {
                        return 'Please enter a valid last name.';
                    }
                }
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the role ID of the employee?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid role ID.';
                }
            },
            {
                type: 'input',
                name: 'manager',
                message: 'What is the manager ID of the employee?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid manager ID.';
                }
            },
        ])
        .then((answer) => {
            connection.query('INSERT INTO employee SET ?', { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role, manager_id: answer.manager }, (err) => {
                if (err) throw err;
                console.log(err);
                console.log('\n');
                console.log('New employee added successfully!');
                start();
            });
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee',
                message: 'What is the ID of the employee you would like to update?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid employee ID.';
                }
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the new role ID of the employee?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid role ID.';
                }
            }
        ])
        .then((answer) => {
            connection.query('UPDATE employee SET ? WHERE ?', [{ role_id: answer.role }, { id: answer.employee }], (err) => {
                if (err) throw err;
                console.log(err);
                console.log('\n');
                console.log('Employee role updated successfully!');
                start();
            });
        });
}