import { executeQuery } from './db/db.js';


// Exporting functions to be used in inquirer.js
export async function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    try {
        const results = await executeQuery(query);
        console.log('\n');
        console.table(results);
        return results;
    } catch (error) {
        console.error('There was an error retrieving all of the departments:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function viewAllRoles() {
    const query = 'SELECT * FROM role';
    try {
        const results = await executeQuery(query);
        console.log('\n');
        console.table(results);
        return results;
    } catch (error) {
        console.error('There was an error retrieving all of the roles:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function viewAllEmployees() {
    const query = 'SELECT * FROM employee';
    try {
        const results = await executeQuery(query);
        console.log('\n');
        console.table(results);
        return results;
    } catch (error) {
        console.error('There was an error retrieving all of the employees:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function createDepartment(departmentName) {
    const query = 'INSERT INTO department (name)VALUES (?)';
    try {
        const results = await executeQuery(query, departmentName);
        console.log('\n');
        console.log('Added department successfully');
        return results;
    } catch (error) {
        console.error('There was an error adding the department:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function createRole(role) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    try {
        const { title, salary, department_id } = role;
        const results = await executeQuery(query, [title, salary, department_id]);
        console.log('\n');
        console.log('Added role successfully');
        return results;
    } catch (error) {
        console.error('There was an error adding the role:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function createEmployee(employee) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    try {
        const { first_name, last_name, role_id, manager_id } = employee;
        const results = await executeQuery(query, [first_name, last_name, role_id, manager_id]);
        console.log('\n');
        console.log('Added employee successfully');
        return results;
    } catch (error) {
        console.error('There was an error adding the employee:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function updateEmployeeRole(employeeId, roleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    try {
        const results = await executeQuery(query, [roleId, employeeId]);
        console.log('\n');
        console.log('Updated employee role successfully');
        return results;
    } catch (error) {
        console.error('There was an error updating the employee role:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function updateEmployeeManager(employeeId, managerId) {
    const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
    try {
        const results = await executeQuery(query, [managerId, employeeId]);
        console.log('\n');
        console.log('Updated employee manager successfully');
        return results;
    } catch (error) {
        console.error('There was an error updating the employee manager:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function removeDepartment(departmentId) {
    const query = 'DELETE FROM department WHERE id = ?';
    try {
        const results = await executeQuery(query, departmentId);
        console.log('\n');
        console.log('Removed department successfully');
        return results;
    } catch (error) {
        console.error('There was an error removing department:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function removeRole(roleId) {
    const query = 'DELETE FROM role WHERE id = ?';
    try {
        // Check if role has any employees assigned to it
        const employees = await getEmployeesByRole(roleId);
        if (employees.length > 0) {
            throw new Error('Cannot remove role with assigned employees. \n Please remove all employees with this role before removing the role.');
        }

        const results = await executeQuery(query, roleId);
        console.log('\n');
        console.log('Removed role successfully');
        return results;
    } catch (error) {
        console.error('There was an error removing the role:',);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function removeEmployee(employeeId) {
    const query = 'DELETE FROM employee WHERE id = ?';
    try {
        const results = await executeQuery(query, employeeId);
        console.log('\n');
        console.log('Removed employee successfully');
        return results;
    } catch (error) {
        console.error('There was an error removing the employee:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error', error);
    }
}

export async function findAllEmployeesByDept(departmentId) {
    const query = 'SELECT * FROM employee WHERE department_id = ?';
    try {
        const results = await executeQuery(query, [departmentId]);
        console.log('\n');
        console.table(results);
        return results;
    } catch (error) {
        console.error('There was an error retrieving employees by department:', error);
    }
}

export async function viewEmployeesByManager(managerId) {
    const query = 'SELECT * FROM employee WHERE manager_id = ?';
    try {
        const results = await executeQuery(query, managerId);
        console.log('\n');
        console.table(results);
        return results;
    } catch (error) {
        console.error('There was an error getting the manager ID:');
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.', error);
    }
}

export async function viewAllPossibleManagers(employeeId) {
    const query = 'SELECT id, first_name, last_name FROM employee WHERE id != ?';
    try {
        const results = await executeQuery(query, employeeId);
        console.log('\n');
        console.table(results);
        return results;
    } catch (error) {
        console.error('There was an error retrieving all possible managers:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
    }
}

export async function viewDepartmentBudget(departmentId) {
    const query = `
    SELECT department.id, department.name, SUM(role.salary) AS budget
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    WHERE department.id = ?
    GROUP BY department.id, department.name;
    `;
    try {
        const results = await executeQuery(query, departmentId);
        console.log('\n');
        console.table(results);
        return results;
    } catch (error) {
        console.error('There was an error retrieving the budget:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
    }
}