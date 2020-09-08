'use strict';

const util = require('util');
const mysql = require('mysql');

// Create database connection
const connection = mysql.createConnection({
    host : 'localhost',

    //username
    user : 'root',

    //password
    password : 'asdf@123',

    // database name to connect with
    database : 'employee_DB'
});

// Connect to databse
connection.connect(function(err){
    if(err) throw err;
});

// setting up connection.query to use promises instead of callbacks
// This allows us to use async/await syntax
connection.query = util.promisify(connection.query);

// Export connection
module.exports = connection;