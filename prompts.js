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
    ] 
};