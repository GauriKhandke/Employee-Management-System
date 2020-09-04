'use strict';

const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const prompts = require('./prompts');
const db = require('./db');
require('console.table');

async function viewAllTitles(){

    const titles = await db.viewAllTitles();

    console.log('\n');
    console.table(titles);

    mainPrompt();
}

function mainPrompt(){

    inquirer.prompt(prompts.mainPrompt)
    .then(function(answer){
        switch(answer.menuAction){
            case 'View all employees':
                break;

            case 'View all employees by department':
                break;

            case 'View all employees by manager':
                break;

            case 'Add Employee' :
                break;

            case 'Remove Employee':
                break;

            case 'Update employee role':
                break;
            
            case 'Update employee manager':
                break;

            case 'Exit':
                db.closeConnection();
                console.log("Connection closed!");
                break;
        }
    });
}

mainPrompt();