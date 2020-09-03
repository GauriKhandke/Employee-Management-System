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