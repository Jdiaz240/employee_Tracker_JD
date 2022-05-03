const { prompt } = require("inquirer");
const db = require("./");
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
    ]).then(res => {
        let choices = res.choices;
        //now we call the appropriate function depending on what the user chooses
        //how would we organize this?

    })

}

//conditional statement here - call corresponding function

//async function viewEmployees() {
//    let employees = await db.findAllEmployees();
//    console.table(employees);
//}

function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees)
    })
    .then(() => mainMenu());
}

function quit() {
    console.log("Goodbye"),
    process.exit();
};