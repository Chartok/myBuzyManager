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
                message: 'Please select an option',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'View employees by manager',
                    'View employees by department',
                    'Delete a department',
                    'Delete a role',
                    'Delete an employee',
                    'View department budget',
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
                case 'Update an employee manager':
                    updateEmployeeManager();
                    break;
                case 'View employees by manager':
                    viewEmployeesByManager();
                    break;
                case 'View employees by department':
                    viewEmployeesByDept();
                    break;
                case 'Delete a department':
                    deleteDept();
                    break;
                case 'Delete a role':
                    deleteRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'View department budget':
                    viewBudget();
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
                        return 'Please enter a valid department name...';
                    }
                }
            }
        ])
        .then((answer) => {
            connection.query('INSERT INTO department SET ?', { name: answer.department }, (err) => {
                if (err) throw err;
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
                    return valid || 'Please enter a valid salary...';
                },
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department ID of the role?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid department ID...';
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
                        return 'Please enter a valid last name...';
                    }
                }
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the role ID of the employee?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid role ID...';
                }
            },
            {
                type: 'input',
                name: 'manager',
                message: 'What is the manager ID of the employee?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid manager ID...';
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
                    return valid || 'Please enter a valid employee ID...';
                }
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the new role ID of the employee?',
                validate: function (value) {
                    let valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                    return valid || 'Please enter a valid role ID...';
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

function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the ID of the employee you would like to update?',
            validate: value => positiveIntegerRegex.test(value) || 'Please enter a valid employee ID...'
        },
        {
            type: 'input',
            name: 'newManagerId',
            message: 'What is the new manager ID?',
            validate: value => positiveIntegerRegex.test(value) || 'Please enter a valid manager ID...'
        }

    ]).then((answer) => {
        connection.query('UPDATE employee SET ? WHERE ?', [{ manager_id: answer.newManagerId }, { id: answer.employeeId }], (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('Employee manager updated successfully!');
            start();
        });
    });

}

function viewEmployeesByManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'managerId',
            message: 'Please enter the manager ID to view their employees:',
            validate: value => positiveIntegerRegex.test(value) || 'Please enter a valid manager ID...'
        }
    ]).then((answer) => {
        connection.query('SELECT * FROM employee WHERE ?', { manager_id: answer.managerId }, (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.table(res);
            start();
        });
    });
}

function deleteDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentId',
            message: 'Please enter the ID of the department you want to delete:',
            validate: value => positiveIntegerRegex.test(value) || 'Please enter a valid department ID...'
        }
    ]).then((answer) => {
        connection.query('DELETE FROM department WHERE ?', { id: answer.departmentId }, (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('Department deleted successfully!');
            start();
        });
    });
}

function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleId',
            message: 'Please enter the ID of the role you want to delete:',
            validate: value => positiveIntegerRegex.test(value) || 'Please enter a valid role ID...'
        }
    ]).then((answer) => {
        connection.query('DELETE FROM role WHERE ?', { id: answer.roleId }, (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('Role deleted successfully!');
            start();
        });
    });
}

function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Please enter the ID of the employee you want to delete:',
            validate: value => positiveIntegerRegex.test(value) || 'Please enter a valid employee ID...'
        }
    ]).then((answer) => {
        connection.query('DELETE FROM employee WHERE ?', { id: answer.employeeId }, (err) => {
            if (err) throw err;
            console.log('\n');
            console.log('Employee deleted successfully!');
            start();
        });
    });
}

function viewBudget() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentId',
            message: 'Please enter the ID of the department you want to view:',
            validate: value => positiveIntegerRegex.test(value) || 'Please enter a valid department ID...'
        }
    ]).then((answer) => {
        connection.query('SELECT SUM(salary) AS budget FROM role WHERE department_id = ?', [answer.departmentId], (err, res) => {
            if (err) throw err;
            console.log('\n');
            console.table(res);
            start();
        });
    });
}