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
    .then(function (answer) {
        console.log(answer.choice);
        switch(answer.choice) {
            case "VIEW_EMPLOYEE":
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
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "UPDATE_EMPLOYEE":
                updateEmployee();
                break;

            default:
                exitCycle();
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
    db.findDepartments()
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
        const newEmployee = employee.map(({ first_Name, last_Name, occupation }) => ({
            name: `${first_Name} ${last_Name}`, 
            value: occupation, 
        }) ) 
    })
  
    prompt ([
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
            name: "occupation",
            message: "Please choose an occupation",
            choices: ["Legal", "Engineering", "Human Resources", "Warehouse"],
        }
    ])
}


function quit() {
    console.log("Goodbye"),
    process.exit();
};

const init = () => {
    mainMenu()
}

init()