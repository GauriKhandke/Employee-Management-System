# Employee-Management-System

![MIT License](https://img.shields.io/badge/license-MIT-green)

# Goal :

Architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

# Motivation : 

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems.

# Table of Contents

* [Demo](#demo)
* [Technology](#technology)
* [Usage](#usage)
* [Features](#features)
* [License](#license)
* [Contribution](#contribution)
* [Questions](#questions)

# User Story : 

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

# Demo : 

# Screenshots :  

# Database Schema : 

![Database Schema](./images/schema.png)

* **department** :

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role** :

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee** :

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

# Technology :

**3. [MySQL](https://www.npmjs.com/package/mysql) NPM package** : 
* MySQL is an open-source relational database management system.
* A relational database organizes data into one or more data tables in which data types may be related to each other; these relations help structure the data.
* SQL is used by language programmers to create, modify and extract data from the relational database, as well as control user access to the database.

**2. [Node.js](https://nodejs.org/en/)** : 

* Node.js is an open-source and cross-platform JavaScript runtime environment. 

* A Node.js app is run in a single process, without creating a new thread for every request. 

* Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking.

**3. [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3)** :

* Inquirer.js strives to be an easily embeddable and beautiful command line interface for Node.js. 

* NPM package to interact with the user via the command-line.

**4. [console.table](https://www.npmjs.com/package/console.table)** :

* Uses easy-table for printing to console.log

* Used to print MySQL rows to the console.

**5. [asciiart-logo](https://www.npmjs.com/package/asciiart-logo)** :
* asciiart-logo renders a splash screen in text console with logo from ASCII characters.

* Splash screen is a rectangular panel and logo is the application name rendered by ASCII-art fonts extended by optional additional information.

* asciiart-logo can be used by starting of command line tools, web servers or REST API microservices as a visual feedback to the user or administrator about successful start of the application.

* Used this NPM package to add some visual flare to the main logo. 

# Usage :

* Clone this repository to use this application on local machine.

* To install necessary dependencies, run the following command :

```
npm i
```

* The application will be invoked with the following command : 

```
node server.js
```
* After running above command, user is presented with series of options to manage employee databse.

# Features :

1. MySql npm package is used to connect to database and perform queries.

2. Inquirer npm package is used to interact with the user via the command-line.

3. Console.table is used to print MySQL rows to the console.

4. Asciiart-logo NPM package is used to add some visual flare to the main logo.

5. User can view all employees, employees by department, employees by manager.

6. User can add employee, add department, add role.

7. User can update employee role, employee manager.

8. User can remove employee.

9. User can view all departments, roles.

10. Created three tables - department, role and employee. These tables are connected with primary and foreign keys.

11. Included a `schema.sql` to hold databse schema and `seed.sql` file to pre-populate database. This makes development of individual features much easier.

# License

This project is licensed under MIT license.

# Contribution

Pull requests are always welcome!

# Questions

If you have any questions about the repo, 
[open an issue](https://github.com/GauriKhandke/Employee-Management-System/issues) 
or contact me directly at [Email](mailto:khandkegauri@gmail.com).