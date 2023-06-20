import inquirer from "inquirer";
import {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    createDepartment,
    createRole,
    createEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    removeDepartment,
    removeRole,
    removeEmployee,
    viewDepartmentBudget,
    viewEmployeesByManager,
    viewAllPossibleManagers,
} from "./queries.js";

// Import validation functions for validating user input in add/update/delete functions
import { validateAlpha, validatePositiveInteger } from "./validate.js";

// Export start function to index.js to start the application when connection is successful
export async function start(connection) {
    const choices = [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee's Role",
        "Update an Employee's Manager",
        "Remove a Department",
        "Remove a Role",
        "Remove an Employee",
        "View Department Budget",
        "View Employees by Department",
        "View Employees by Manager",
        "View All Possible Managers",
        "Exit",
    ];

    // While loop to continue prompting user for action until user chooses to exit
    while (true) {
        try {
            const { action } = await inquirer.prompt([
                {
                    type: "list",
                    name: "action",
                    message: "What would you like to do?",
                    choices: choices,
                },
            ]);

            switch (action) {
                case "View All Departments":
                    await handleViewAllDepartments();
                    break;
                case "View All Roles":
                    await handleViewAllRoles();
                    break;
                case "View All Employees":
                    await handleViewAllEmployees();
                    break;
                case "Add a Department":
                    await handleCreateDepartment();
                    break;
                case "Add a Role":
                    await handleCreateRole();
                    break;
                case "Add an Employee":
                    await handleCreateEmployee();
                    break;
                case "Update an Employee's Role":
                    await handleUpdateEmployeeRole();
                    break;
                case "Update an Employee's Manager":
                    await handleUpdateEmployeeManager();
                    break;
                case "Remove a Department":
                    await handleRemoveDepartment();
                    break;
                case "Remove a Role":
                    await handleRemoveRole();
                    break;
                case "Remove an Employee":
                    await handleRemoveEmployee();
                    break;
                case "View Department Budget":
                    await handleViewDepartmentBudget();
                    break;
                case "View Employees by Department":
                    await handleViewEmployeesByDepartment();
                    break;
                case "View Employees by Manager":
                    await handleViewEmployeesByManager();
                    break;
                case "View All Possible Managers":
                    await handleViewAllPossibleManagers();
                    break;
                case "Exit":
                    console.log("Goodbye!");
                    connection.end();
                    return;
                default:
                    console.log("Invalid action");
                    break;
            }
        } catch (error) {
            console.log(
                "There was an error. Please contact your System's Administrator with the error information.\n",
                error
            );
        }
    }
}

// Functions to handle each action
async function handleViewAllDepartments() {
    await viewAllDepartments();
}

async function handleViewAllRoles() {
    await viewAllRoles();
}

async function handleViewAllEmployees() {
    await viewAllEmployees();
}

async function handleCreateDepartment() {
    try {

    const { department } = await inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?",
            validate: validateAlpha,
        },
    ]);

        await createDepartment(department);

    } catch (error) {
        console.log("There was an error adding the department. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleCreateRole() {
    try {
        const { title, salary, department_id } =
        await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role?",
            validate: validateAlpha,
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
            validate: validatePositiveInteger,
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id of the role?",
            validate: validatePositiveInteger,
        },
    ]);
    console.log(title)

        await createRole({ title, salary, department_id });

    } catch (error) {
        console.error("There was an error adding the role. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleCreateEmployee() {
    try {
    const employee = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee?",
            validate: validateAlpha,
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the employee?",
            validate: validateAlpha,
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role id of the employee?",
            validate: validatePositiveInteger,
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the manager id of the employee?",
            validate: validatePositiveInteger,
        },
    ]);

        await createEmployee(employee);

    } catch (error) {
        console.log("There was an error creating the employee. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleUpdateEmployeeRole() {
    try {
    const { employee_id, role_id } = await inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "What is the id of the employee?",
            validate: validatePositiveInteger,
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role id of the employee?",
            validate: validatePositiveInteger,
        },
    ]);

        await updateEmployeeRole(employee_id, role_id);

    } catch (error) {
        console.log("There was an error updating the employee's role. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleUpdateEmployeeManager() {
    try {
    const { employee_id, manager_id } = await inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "What is the id of the employee?",
            validate: validatePositiveInteger,
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the manager id of the employee?",
            validate: validatePositiveInteger,
        },
    ]);

    await updateEmployeeManager(employee_id, manager_id);

} catch (error) {
    console.log("There was an error updating the employee's manager. Please contact your System's Administrator with the error information.\n", error);
}
}

async function handleRemoveDepartment() {
    try {
    const { department_id } = await inquirer.prompt([
        {
            type: "input",
            name: "department_id",
            message: "What is the id of the department?",
            validate: validatePositiveInteger,
        },
    ]);

        await removeDepartment(department_id);

    } catch (error) {
        console.log("There was an error removing the department. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleRemoveRole() {
    try {
    const { role_id } = await inquirer.prompt([
        {
            type: "input",
            name: "role_id",
            message: "What is the id of the role?",
            validate: validatePositiveInteger,
        },
    ]);

        await removeRole(role_id);

    } catch (error) {
        console.log("There was an error removing the role. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleRemoveEmployee() {
    try {
    const { employee_id } = await inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "What is the id of the employee?",
            validate: validatePositiveInteger,
        },
    ]);

        await removeEmployee(employee_id);

    } catch (error) {
        console.log("There was an error removing the employee. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleViewDepartmentBudget() {
    try {
    const { department_id } = await inquirer.prompt([
        {
            type: "input",
            name: "department_id",
            message: "What is the id of the department?",
            validate: validatePositiveInteger,
        },
    ]);

        await viewDepartmentBudget(department_id);

    } catch (error) {
        console.log("There was an error viewing the budget. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleViewEmployeesByDepartment() {
    try {
        const { department_id } = await inquirer.prompt([
            {
                type: "input",
                name: "department_id",
                message: "What is the id of the department?",
                validate: validatePositiveInteger,
            },
        ]);

        await handleViewEmployeesByDepartment(department_id);

    } catch (error) {
        console.log("There was an error viewing employees by department. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleViewEmployeesByManager() {
    try {
        const { manager_id } = await inquirer.prompt([
            {
                type: "input",
                name: "manager_id",
                message: "What is the id of the manager?",
                validate: validatePositiveInteger,
            },
        ]);

        await viewEmployeesByManager(manager_id);

    } catch (error) {
        console.log("There was an error viewing employees by manager. Please contact your System's Administrator with the error information.\n", error);
    }
}

async function handleViewAllPossibleManagers() {
    try {
        const { employee_id } = await inquirer.prompt([
            {
                type: "input",
                name: "employee_id",
                message: "What is the id of the employee?",
                validate: validatePositiveInteger,
            },
        ]);

        await viewAllPossibleManagers(employee_id);

    } catch (error) {
        console.log("There was an error viewing all possible managers. Please contact your System's Administrator with the error information.\n", error);
    }
}
