import db from '/db.js';
class DB {
    constructor(connection) {
        this.connection = connection;
    }

    // use the promise() method to access the asynchronous connection
    async query(queryString, params) {
        try {
            let queryParams;
            if (Array.isArray(params)) {
                queryParams = params;
            } else if (typeof params === "object" && params !== null) {
                queryParams = [params];
            } else {
                queryParams = [params];
            }

            const [rows] = await this.connection.promise().query(queryString, queryParams);
            return rows;
        } catch (error) {
            console.error(`ERROR - ${queryString} : ${error.sqlMessage}`);
        }
    }

    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    async findAllEmployees() {
        return this.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    }

    async findAllEmployeesByDept(departmentId) {
        return this.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee. role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;", departmentId);
    }

    async findAllPossibleManagers(employeeId) {
        return this.query("SELECT id, first_name, last_name FROM employee WHERE id != ?", employeeId);
    }

    async createEmployee(first_name, last_name, role_id, manager_id) {
        return this.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [first_name, last_name, role_id, manager_id]);
    }

    async removeEmployee(employeeId) {
        return this.query("DELETE FROM employee WHERE id = ?", employeeId);
    }

    async updateEmployeeRole(employeeId, roleId) {
        return this.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }

    async updateEmployeeManager(employeeId, managerId) {
        return this.query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]);
    }

    async findAllRoles() {
        return this.query("SELECT role.id, role.title, department. name AS department, role.salary FROM role LEFT JOIN department on role. department_id = department.id;");
    }

    async createRole(role) {
        return this.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [role.title, role.salary, role.department_id]);
    }

    async removeRole(roleId) {
        return this.query("DELETE FROM role WHERE id = ?", roleId);
    }

    async findAllDept() {
        return this.query("SELECT department.id, department.name FROM department;");
    }

    async viewDepartmentBudget() {
        return this.query("SELECT department.id, department.name, SUM(role.salary) AS budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;");
    }

    async createDepartment(department) {
        return this.query("INSERT INTO department (name) VALUES (?)", department);
    }

    async removeDept(departmentId) {
        return this.query("DELETE FROM department WHERE id = ?", departmentId);
    }
}

export default new DB(db);
