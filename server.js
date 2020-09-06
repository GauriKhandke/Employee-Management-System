"use strict";

const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const prompts = require("./prompts");
const db = require("./db");
require("console.table");


async function viewAllEmployees(){
	
	const empData = await db.viewAllEmployees();

    console.log("\n");
    console.table(empData);
	
	mainPrompt();
}

async function viewAllRoles(){
	
	const roles = await db.viewAllRoles();

    console.log("\n");
    console.table(roles);
	
	mainPrompt();
}

async function viewAllDepartments(){
	
	const departments = await db.viewAllDepartments();

    console.log("\n");
    console.table(departments);
	
	mainPrompt();
}

async function viewEmployeesByDepartment(){
	
	const emp = await db.viewEmployeesByDepartment();

    console.log("\n");
    console.table(emp);
	
	mainPrompt();
}

async function addEmployee(){

	const rolesResult = await db.getRoles();
	
	let roleNames = [];
	for (let i = 0; i < rolesResult.length; i++) {
		roleNames.push(rolesResult[i].title)
	}

	const employeeResult = await db.getEmployees();
	
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(employeeResult[i].first_name+ " "+ employeeResult[i].last_name)
	}

	prompts.addEmployee.push({
		type : 'list',
		name : 'roleName',
		message : "What is role ?",
		choices: roleNames
	});
	prompts.addEmployee.push({
		type : 'list',
		name : 'managerName',
		message : "What is manager name ?",
		choices: employeeNames
	});

	const {firstName, lastName, roleName, managerName} = await inquirer.prompt(prompts.addEmployee);
	const managerFirstName = managerName.split(" ")[0];
	const managerLastName = managerName.split(" ")[1];

	const roleId = rolesResult.filter(role => role.title === roleName)[0].id;
	const managerId = employeeResult.filter(employee => employee.first_name === managerFirstName && employee.last_name === managerLastName)[0].id;

	const addEmployeeResult = await db.addEmployee(firstName, lastName, roleId, managerId);

	viewAllEmployees();
}

async function addDepartment(){
	
	const { deptName } = await inquirer.prompt(prompts.addDepartment);

	const result = await db.addDepartment(deptName);

	viewAllDepartments();
}


async function addRole(){

	const departmentsResult = await db.getDepartments();
	
	let departments = [];
	for (let i = 0; i < departmentsResult.length ;i++){
    	departments.push(departmentsResult[i].name);
    }
	
	prompts.addRole.push({
		type : 'list',
		name : 'departmentName',
		message : "What is role's department Name ?",
		choices: departments
	});

	const { roleTitle , roleSalary, departmentName} = await inquirer.prompt(prompts.addRole);

	const departmentId = departmentsResult.filter(res => res.name === departmentName)[0].id;
	const addRoleResult = await db.addRole(roleTitle, roleSalary, departmentId);

	viewAllRoles();
}

async function mainPrompt() {

    const { menuAction } = await inquirer.prompt(prompts.mainPrompt);
	switch (menuAction) {
		case 'View all employees':
            viewAllEmployees();
			break;

		case 'View all roles':
			viewAllRoles();
			break;

		case 'View all departments':
			viewAllDepartments();
			break;

		case 'View all employees by department':
			viewEmployeesByDepartment();
			break;

		case 'View all employees by manager':
			break;

		case 'Add Employee':
			addEmployee();
			break;

		case 'Add Department':
			addDepartment();
			break;

		case 'Add Role':
			addRole();
			break;

		case "Update employee role":
			break;

		case "Update employee manager":
			break;

		case "Remove Employee":
			break;

		case "Exit":
			db.closeConnection();
			console.log("Connection closed!");
			break;
	}
}

function init(){
	// add logo
	mainPrompt();
}

init();