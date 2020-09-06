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

    getDepartments(){
        try{
            return this.connection.query(
                `
                SELECT 
                    * 
                FROM department;
                `
            );
        }
        catch(err){
            if(err) throw err;
        }   
    }

    getRoles(){
        try{
            return this.connection.query(
                `
                SELECT 
                    * 
                FROM role;
                `
            );
        }
        catch(err){
            if(err) throw err;
        }   
    }

    getEmployees(){
        try{
            return this.connection.query(
                `
                SELECT 
                    * 
                FROM employee;
                `
            );
        }
        catch(err){
            if(err) throw err;
        }   
    }

    addRole(title, salary, departnemtId){
        try{
             this.connection.query(
                'INSERT INTO role SET ?',
                {
                    title: `${title}`,
                    salary: `${salary}`,
                    department_id: `${departnemtId}`
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\nSuccessfully added role with title:${title}, salary:${salary}, departmentId:${departnemtId}`);
                    return res;
                }
            );
        }
        catch(err){
            console.log("Error inserting role : "+ err );
        }
    }

    addEmployee(firstName, lastName, roleId, managerId){
        try{
             this.connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: `${firstName}`,
                    last_name: `${lastName}`,
                    role_id: `${roleId}`,
                    manager_id: `${managerId}`
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\nSuccessfully added employee with firstName:${firstName}, lastName:${lastName}, roleId:${roleId}, managerId:{managerId}`);
                    return res;
                }
            );
        }
        catch(err){
            console.log("Error inserting role : "+ err );
        }
    }

    addDepartment(deptName){
        try{
             this.connection.query(
                'INSERT INTO department SET ?',
                {
                    name: `${deptName}`,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\nSuccessfully added ${deptName} department!`);
                    return res;
                }
            );
        }
        catch(err){
            console.log("Error inserting department : "+ err );
        }
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