"use strict";

const connection = require("./connection");

class DB {
	constructor(connection) {
		this.connection = connection;
	}

	viewAllEmployees() {
		return this.connection.query(
			`
            SELECT
                e1.id AS ID,
                e1.first_name AS First_Name,
                e1.last_name AS Last_Name,
                role.title AS Role,
                department.name AS Department,
                CONCAT(e2.first_name, ' ', e2.last_name) AS Manager,
                role.salary AS Salary
            FROM
                employee e1
            LEFT JOIN
                role ON e1.role_id = role.id
            LEFT JOIN
                employee e2 ON e1.manager_id = e2.id
		    LEFT JOIN department ON role.department_id = department.id
		    ORDER BY
                e1.id;
        `
		);
    }
    
    viewAllEmployeesByManager(){
        return this.connection.query(
            `
            SELECT
                e1.id AS ID,
                e1.first_name AS First_Name,
                e1.last_name AS Last_Name,
                role.title AS Role,
                department.name AS Department,
                CONCAT(e2.first_name, ' ', e2.last_name) AS Manager,
                role.salary AS Salary
            FROM
                employee e1
            LEFT JOIN
                role ON e1.role_id = role.id
            LEFT JOIN
                employee e2 ON e1.manager_id = e2.id
		    LEFT JOIN department ON role.department_id = department.id
		    ORDER BY
                e1.manager_id;
            `
        );
    }

	viewAllRoles() {
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

	viewAllDepartments() {
		return this.connection.query(
			`
        SELECT 
	        id,
	        name AS Departments 
        FROM department;
        `
		);
	}

	viewEmployeesByDepartment() {
		return this.connection.query(
            `
            SELECT
                e1.id AS ID,
                e1.first_name AS First_Name,
                e1.last_name AS Last_Name,
                role.title AS Role,
                department.name AS Department,
                CONCAT(e2.first_name, ' ', e2.last_name) AS Manager,
                role.salary AS Salary
            FROM
                employee e1
            LEFT JOIN
                role ON e1.role_id = role.id
            LEFT JOIN
                employee e2 ON e1.manager_id = e2.id
            LEFT JOIN department ON role.department_id = department.id
            ORDER BY
                department.name;
            ` 
		);
	}

	getDepartments() {
		try {
			return this.connection.query(
				`
                SELECT 
                    * 
                FROM department;
                `
			);
		} catch (err) {
			if (err) throw err;
		}
	}

	getRoles() {
		try {
			return this.connection.query(
				`
                SELECT 
                    * 
                FROM role;
                `
			);
		} catch (err) {
			if (err) throw err;
		}
	}

	getEmployees() {
		try {
			return this.connection.query(
				`
                SELECT 
                    * 
                FROM employee;
                `
			);
		} catch (err) {
			if (err) throw err;
		}
	}

	addRole(title, salary, departnemtId) {
		try {
			this.connection.query(
				"INSERT INTO role SET ?",
				{
					title: `${title}`,
					salary: `${salary}`,
					department_id: `${departnemtId}`,
				},
				function (err, res) {
					if (err) throw err;
					console.log(
						`\nSuccessfully added role with title:${title}, salary:${salary}, departmentId:${departnemtId}`
					);
					return res;
				}
			);
		} catch (err) {
			console.log("Error inserting role : " + err);
		}
	}

	addEmployee(firstName, lastName, roleId, managerId) {
		try {
			this.connection.query(
				"INSERT INTO employee SET ?",
				{
					first_name: `${firstName}`,
					last_name: `${lastName}`,
					role_id: `${roleId}`,
					manager_id: `${managerId}`,
				},
				function (err, res) {
					if (err) throw err;
					console.log(
						`\nSuccessfully added employee with firstName:${firstName}, lastName:${lastName}, roleId:${roleId}, managerId:{managerId}`
					);
					return res;
				}
			);
		} catch (err) {
			console.log("Error inserting role : " + err);
		}
	}

	addDepartment(deptName) {
		try {
			this.connection.query(
				"INSERT INTO department SET ?",
				{
					name: `${deptName}`,
				},
				function (err, res) {
					if (err) throw err;
					console.log(
						`\nSuccessfully added ${deptName} department!`
					);
					return res;
				}
			);
		} catch (err) {
			console.log("Error inserting department : " + err);
		}
	}

	updateEmployeeRole(empId, roleId) {
		try {
			// UPDATE employee SET role_id = 4 WHERE id = 4;
			this.connection.query(
				"UPDATE employee SET ? Where ?",
				[
					{
						role_id: roleId,
					},
					{
						id: empId,
					},
				],
				function (error) {
					if (error) throw err;
					console.log(`\nUpdated employee's role successfully!`);
				}
			);
		} catch (err) {
			if (err) throw err;
		}
	}

	updateEmployeeManager(empId, managerId) {
		//UPDATE employee SET manager_id = 2 WHERE id = 3;
		try {
			this.connection.query(
				"UPDATE employee SET ? WHERE ?",
				[
					{
						manager_id: managerId,
					},
					{
						id: empId,
					},
				],
				function (error) {
					if (error) throw error;
					console.log(`\nUpdated employee's manager successfully!`);
				}
			);
		} catch (error) {
			if (error) throw error;
		}
    }
    
    removeEmployee(empId){
        // DELETE FROM employee WHERE id = 2;
        try {
			this.connection.query(
				"DELETE FROM employee WHERE ?",
				[
					{
						id: empId,
					}
				],
				function (error) {
					if (error) throw error;
					console.log(`\nRemoved employee with id : ${empId} successfully!`);
				}
			);
		} catch (error) {
			if (error) throw error;
		}
    }

	closeConnection() {
		try {
			this.connection.end();
		} catch (error) {
			console.log("Error closing connection : " + error);
		}
	}
}

module.exports = new DB(connection);
