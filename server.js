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
			break;

		case 'Add Department':
			break;

		case 'Add Role':
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