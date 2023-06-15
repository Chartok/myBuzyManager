import { executeQuery } from './db/db.js';

export function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    return executeQuery(query)
        .then((results) => {
            console.log('\n');
            console.table(results);
            return results;
        })
        .catch((error) => {
            console.error('There was an error retrieving all of the departments:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

// Implement other query functions in a similar manner

export function viewAllRoles() {
    const query = 'SELECT * FROM role';
    return executeQuery(query)
        .then((results) => {
            console.log('\n');
            console.table(results);
            return results;
        })
        .catch((error) => {
            console.error('There was an error retrieving all of the roles:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function viewAllEmployees() {
    const query = 'SELECT * FROM employee';
    return executeQuery(query)
        .then((results) => {
            console.log('\n');
            console.table(results);
            return results;
        })
        .catch((error) => {
            console.error('There was an error retrieving all of the employees:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function addDepartment(department) {
    const query = 'INSERT INTO department SET ?';
    return executeQuery(query, department)
        .then((results) => {
            console.log('\n');
            console.log('Added department successfully');
            return results;
        })
        .catch((error) => {
            console.error('There was an error adding the department:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function addRole(role) {
    const query = 'INSERT INTO role SET ?';
    return executeQuery(query, role)
        .then((results) => {
            console.log('\n');
            console.log('Added role successfully');
            return results;
        })
        .catch((error) => {
            console.error('There was an error adding the role:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function addEmployee(employee) {
    const query = 'INSERT INTO employee SET ?';
    return executeQuery(query, employee)
        .then((results) => {
            console.log('\n');
            console.log('Added employee successfully');
            return results;
        })
        .catch((error) => {
            console.error('There was an error adding the employee:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function updateEmployeeRole(employeeId, roleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return executeQuery(query, [roleId, employeeId])
        .then((results) => {
            console.log('\n');
            console.log('Updated employee role successfully');
            return results;
        })
        .catch((error) => {
            console.error('There was an error updating the employee role:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function updateEmployeeManager(employeeId, managerId) {
    const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
    return executeQuery(query, [managerId, employeeId])
        .then((results) => {
            console.log('\n');
            console.log('Updated employee manager successfully');
            return results;
        })
        .catch((error) => {
            console.error('There was an error updating the employee manager:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function removeDepartment(departmentId) {
    const query = 'DELETE FROM department WHERE id = ?';
    return executeQuery(query, departmentId)
        .then((results) => {
            console.log('\n');
            console.log('Removed department successfully');
            return results;
        })
        .catch((error) => {
            console.error('There was an error removing department:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function removeRole(roleId) {
    const query = 'DELETE FROM role WHERE id = ?';
    return executeQuery(query, roleId)
        .then((results) => {
            console.log('\n');
            console.log('Removed role successfully');
            return results;
        })
        .catch((error) => {
            console.error('There was an error removing the role:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function removeEmployee(employeeId) {
    const query = 'DELETE FROM employee WHERE id = ?';
    return executeQuery(query, employeeId)
        .then((results) => {
            console.log('\n');
            console.log('Removed employee successfully');
            return results;
        })
        .catch((error) => {
            console.error('There was an error removing the employee:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function viewEmployeesByDepartment(departmentId) {
    const query = 'SELECT * FROM employee WHERE department_id = ?';
    return executeQuery(query, departmentId)
        .then((results) => {
            console.log('\n');
            console.table(results);
            return results;
        })
        .catch((error) => {
            console.error('There was an error retrieving employees by department:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function viewEmployeesByManager(managerId) {
    const query = 'SELECT * FROM employee WHERE manager_id = ?';
    return executeQuery(query, managerId)
        .then((results) => {
            console.log('\n');
            console.table(results);
            return results;
        })
        .catch((error) => {
            console.error('There was an error getting the manager ID:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}

export function viewDepartmentBudget(departmentId) {
    const query = 'SELECT SUM(salary) AS budget FROM employee WHERE department_id = ?';
    return executeQuery(query, departmentId)
        .then((results) => {
            console.log('\n');
            console.table(results);
            return results;
        })
        .catch((error) => {
            console.error('There was an error retrieving the budget:', error);
            console.log('\n');
            console.log('Please contact your System Administrator with the error information.');
            throw error;
        });
}