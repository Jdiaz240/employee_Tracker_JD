const req = require("express/lib/request");
const res = require("express/lib/response");
const { prompt } = require("inquirer");
const db = require("./db");
const { findDepartment, connection } = require("./db");
require("console.table");

function mainMenu() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View ALL Employees",
                    value: "VIEW_EMPLOYEES",
                },
                {
                    name: "View ALL Departments",
                    value: "VIEW_DEPARTMENTS",
                },
                {
                    name: "View ALL Roles",
                    value: "VIEW_ROLES",
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE",
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENTS",
                },
                {
                    name: "Update Employee",
                    value: "UPDATE_EMPLOYEE",
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ])
        .then(res => {
            let choice = res.choice;

            switch (choice) {
                case "VIEW_EMPLOYEES":
                    viewEmployees();
                    break;
                case "VIEW_DEPARTMENTS":
                    viewDepartments();
                    break;
                case "VIEW_ROLES":
                    viewRoles();
                    break;
                case "ADD_EMPLOYEE":
                    addEmployee();
                    break;
                case "ADD_DEPARTMENTS":
                    addDepartment();
                    break;
                case "UPDATE_EMPLOYEE":
                    updateEmployee();
                    break;

                default:
                    quit();
            }
        })
}



//conditional statement here - call corresponding function

//async function viewEmployees() {
//    let employees = await db.findAllEmployees();
//    console.table(employees);
//}


function viewEmployees() {
    db.findEmployee()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees)
        })
        .then(() => mainMenu());
}
function viewDepartments() {
    db.findDepartment()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments)
        })
        .then(() => mainMenu());
}
function viewRoles() {
    db.findRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles)
        })
        .then(() => mainMenu());
}

function addEmployee() {
    db.findEmployee()
        .then(([rows]) => {
            let employee = rows;
            const newEmployee = employee.map(({ first_Name, last_Name, role_id }) => ({
                name: `${first_Name} ${last_Name}`,
                value: role_id,
            }))
        })

    prompt([
        {
            type: "input",
            name: "first_Name",
            message: "Please input employee first name?",
        },
        {
            type: "input",
            name: "last_Name",
            message: "Please input employee last name?",
        },
        {
            type: "list",
            name: "role_id",
            message: "Please choose a role?",
            choices: [1, 2, 3, 4],
        }
    ])

        .then((choices) => {
            let employee = choices
            db.createEmployee(employee)
            console.log("Employee added!")
        })


        .then(() => mainMenu())

}

function addDepartment() {
    db.findDepartment()
        .then(([rows]) => {
            let department = rows;
            const newDepartment = department.map(({ name, id }) => ({
                name: `${name}`,
                value: id,
            }))
        })

    prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the name of the department you'd like to add"
        },
        {
            type: "input",
            name: "id",
            message: "Please assign an Id number to this department"
        }
    ])

        .then((choices) => {
            let department = choices
            db.addDepartment(department)
            console.log("department added")
        })
        .then(() => mainMenu())
}

function updateEmployee() {
    // db.findEmployee()
    //     .then(([rows]) => {
    //         let employee = rows;
    //         const newEmployee = employee.map(({ first_Name, last_Name, role_id }) => ({
    //             name: `${first_Name} ${last_Name}`,
    //             value: role_id,
    //         }))
    //     })

    //     prompt([
    //         {
    //             type: "list",
    //             name: "first_Name",
    //             message: "Which employee would you like to update?",
    //             choices: newEmployee,
    //         },
    //     ])
    //     .then((choices) => {
    //         let employee = choices
    //         db.changeEmployee(employee)
    //         console.log("Employee added!")
    //     })
         mainMenu()
}

function quit() {
    console.log("Goodbye"),
        process.exit();
};

const init = () => {
    mainMenu()
}

init()