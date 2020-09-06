module.exports = {
    mainPrompt : [
        {
            type : 'rawlist',
            name : 'menuAction',
            message: 'What would you like to do?',
            choices :[
                'View all employees',
                'View all roles',
                'View all departments',
                'View all employees by department',
                'View all employees by manager',
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

    addDepartment : [
        {
            type : 'input',
            name : 'deptName',
            message : 'Which department would you like to add?'
        }
    ]
    ,

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