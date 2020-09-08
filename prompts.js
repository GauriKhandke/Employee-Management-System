module.exports = {
    // Inquirer questions for mainprompt
    mainPrompt : [
        {
            type : 'rawlist',
            name : 'menuAction',
            message: 'What would you like to do?',
            choices :[
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'View all roles',
                'View all departments',               
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update employee role',
                'Update employee manager',
                'Remove Employee',
                'Exit'
            ]
        }
    ],

    // Questions for add department
    addDepartment : [
        {
            type : 'input',
            name : 'deptName',
            message : 'Which department would you like to add?'
        }
    ]
    ,

    // Questions for add role
    addRole : [
        {
            type : 'input',
            name : 'roleTitle',
            message : 'What is role title?'
        },
        {
            type : 'input',
            name : 'roleSalary',
            message : 'What is salary of that role?'
        }
    ]
    ,
    
    // Questions for add employee
    addEmployee: [
        {
            type: 'input',
            name: 'firstName',
            message: "What is employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is employee's last name?"
        }
    ]
};