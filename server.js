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

async function viewAllEmployeesByManager() {
	
	const empData = await db.viewAllEmployeesByManager();

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
		roleNames.push(rolesResult[i].title);
	}

	const employeeResult = await db.getEmployees();
	
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(employeeResult[i].first_name+ " "+ employeeResult[i].last_name);
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

async function  updateEmployeeRole() {
	
	const rolesResult = await db.getRoles();
	
	let roleNames = [];
	for (let i = 0; i < rolesResult.length; i++) {
		roleNames.push(rolesResult[i].title);
	}

	const employeeResult = await db.getEmployees();
	
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(employeeResult[i].first_name+ " "+ employeeResult[i].last_name);
	}

	let updateEmpRole = [];

	updateEmpRole.push({
		type : 'list',
		name : 'empName',
		message : "Which employee's role to update?",
		choices: employeeNames

	});

	updateEmpRole.push({
		type : 'list',
		name : 'roleName',
		message : "Which role to update for current employee?",
		choices: roleNames
	});

	const { empName, roleName } = await inquirer.prompt(updateEmpRole);

	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	const empId = employeeResult.filter(employee => employee.first_name === empFirstName && employee.last_name === empLastName)[0].id;

	const roleId = rolesResult.filter(role => role.title === roleName)[0].id;

	const updateRoleResult = await db.updateEmployeeRole(empId, roleId);

	viewAllEmployees();

}

async function updateEmployeeManager() {
	
	// Get all details from employee table
	const employeeResult = await db.getEmployees();
	
	// Get only employee names from all details
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(employeeResult[i].first_name+ " "+ employeeResult[i].last_name);
	}

	// array for inquirer prompt
	let updateEmpManager = [];

	// Get employee name whose manager to update from inquirer prompt
	updateEmpManager.push({
		type : 'list',
		name : 'empName',
		message : "Which employee's manager to update?",
		choices: employeeNames

	});

	// Prompt user for employee name whose manager to update 
	const { empName } = await inquirer.prompt(updateEmpManager);

	// filter other employee names ,except whose manager to update
	const empNames = employeeNames.filter(employee => employee !== empName);

	// insert filtered employee's in array of inquirer prompt
	updateEmpManager.push({
		type : 'list',
		name : 'managerName',
		message : "Who is employee's new manager?",
		choices: empNames
	});

	// Prompt user for new manager
	const { managerName } = await inquirer.prompt(updateEmpManager[1]);

	// Split Employee's name whose manager to update
	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	// split manager's Name
	const managerFirstName = managerName.split(" ")[0];
	const managerLastName = managerName.split(" ")[1];

	// Get employee Id from employee name
	const empId = employeeResult.filter(employee => employee.first_name === empFirstName && employee.last_name === empLastName)[0].id;

	// Get manager Id from employee names
	const managerId = employeeResult.filter(employee => employee.first_name === managerFirstName && employee.last_name === managerLastName)[0].id;

	// update databse for managerId of employee in employee table
	const updatemanagerResult = await db.updateEmployeeManager(empId, managerId);

	viewAllEmployees();
}

async function removeEmployee(){

	// Get all details from employee table
	const employeeResult = await db.getEmployees();
	
	// Get only employee names from all details
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(employeeResult[i].first_name+ " "+ employeeResult[i].last_name);
	}

	// array for inquirer prompt
	let removeEmpPrompt = [];

	// Get employee name to remove
	removeEmpPrompt.push({
		type : 'list',
		name : 'empName',
		message : "Which employee to remove?",
		choices: employeeNames
	});

	// Prompt user for employee name to remove
	const { empName } = await inquirer.prompt(removeEmpPrompt);

	// Split Employee's name
	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	// Get employee Id from employee name
	const empId = employeeResult.filter(employee => employee.first_name === empFirstName && employee.last_name === empLastName)[0].id;

	// update database
	const removeEmployeeResult = await db.removeEmployee(empId);

	viewAllEmployees();
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
			viewAllEmployeesByManager();
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
			updateEmployeeRole();
			break;

		case "Update employee manager":
			updateEmployeeManager();
			break;

		case "Remove Employee":
			removeEmployee();
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