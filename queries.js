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
        console.error('There was an error retrieving all of the departments:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
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
        console.error('There was an error retrieving all of the roles:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
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
        console.error('There was an error retrieving all of the employees:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
    }
}

export async function addDepartment(department) {
    const query = 'INSERT INTO department SET ?';
    try {
        const results = await executeQuery(query, department);
        console.log('\n');
        console.log('Added department successfully');
        return results;
    } catch (error) {
        console.error('There was an error adding the department:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
    }
}

export async function addRole(role) {
    const query = 'INSERT INTO role SET ?';
    try {
        const results = await executeQuery(query, role);
        console.log('\n');
        console.log('Added role successfully');
        return results;
    } catch (error) {
        console.error('There was an error adding the role:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
    }
}

export async function addEmployee(employee) {
    const query = 'INSERT INTO employee SET ?';
    try {
        const results = await executeQuery(query, employee);
        console.log('\n');
        console.log('Added employee successfully');
        return results;
    } catch (error) {
        console.error('There was an error adding the employee:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
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
        console.error('There was an error updating the employee role:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
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
        console.error('There was an error updating the employee manager:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
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
        console.error('There was an error removing department:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
    }
}

export async function removeRole(roleId) {
    const query = 'DELETE FROM role WHERE id = ?';
    try {
        const results = await executeQuery(query, roleId);
        console.log('\n');
        console.log('Removed role successfully');
        return results;
    } catch (error) {
        console.error('There was an error removing the role:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
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
        console.error('There was an error removing the employee:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
    }
}

export async function viewEmployeesByDepartment(departmentId) {
    const query = 'SELECT * FROM employee WHERE department_id = ?';
    try {
        const results = await executeQuery(query, departmentId);
        console.log('\n');
        console.table(results);
        return results;
    } catch (error) {
        console.error('There was an error retrieving employees by department:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
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
        console.error('There was an error getting the manager ID:', error);
        console.log('\n');
        console.log('Please contact your System Administrator with the error information.');
        throw error;
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
    const query = 'SELECT SUM(salary) AS budget FROM employee WHERE department_id = ?';
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