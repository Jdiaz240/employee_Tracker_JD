const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    findEmployee() {
        return this.connection.promise().query(
            "SELECT employee.first_name, employee.last_name, employee.role_id FROM employee",
        )
    }
    findDepartment() {
        return this.connection.promise().query(
            "SELECT department.name, department.id FROM department",
        )
    }
    findRoles() {
        return this.connection.promise().query(
            "SELECT role.title, role.id, role.salary, role.department_id FROM role",
        )
    }
    createEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee 
        )
    }
}

module.exports = new DB(connection);