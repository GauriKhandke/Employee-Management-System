'use strict';

const connection = require('./connection');

class DB{
    constructor(connection){
        this.connection = connection;
    }

    viewAllEmployees(){
        return this.connection.query(
        `
        SELECT 
            employee.id AS id,
            employee.first_name AS FirstName,
            employee.last_name AS LastName,
            role.title AS Title,
            department.name AS Department,
            role.salary AS Salary
        FROM
            ((employee
        INNER JOIN role 
            ON employee.role_id = role.id) 
        INNER JOIN department 
            ON role.department_id = department.id)
        ORDER BY employee.id;
        `
        );
    }

    viewAllRoles(){
        return this.connection.query(
            `
            SELECT 
                role.id,
                role.title AS Title,
                department.name AS Department
            FROM 
                role
            LEFT JOIN 
                department ON role.department_id = department.id
            ORDER BY
                role.id;
            `
        );
    }

    viewAllDepartments(){
        return this.connection.query(
        `
        SELECT 
	        id,
	        name AS Departments 
        FROM department;
        `  
        );
    }

    viewEmployeesByDepartment(){
        return this.connection.query(
        `
        SELECT 
            employee.id AS id,
            concat(first_name, " ", employee.last_name) AS Name,
            role.title AS Title,
            department.name AS Department,
            role.salary AS Salary
        FROM
            ((employee
        INNER JOIN role 
            ON employee.role_id = role.id) 
        INNER JOIN department 
            ON role.department_id = department.id)
        ORDER BY department.name;
        `
        );
    }

    closeConnection(){
        try{
            this.connection.end();
        }
        catch(error){
            console.log("Error closing connection : "+error);
        }      
    }
}

module.exports = new DB(connection);