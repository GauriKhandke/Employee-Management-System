USE employee_DB;

INSERT INTO department(name)
VALUES ("Engineering"), ("Sales"), ("Finance"), ("Marketing"), ("Human Resource Management"), ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Software Engineer", 80000, 1), 
	("Web Developer", 65000, 1), 
	("Technical Lead",75000,1),
	("Sales Person",50000, 2),
	("Sales Lead", 60000,2),
	("Account Executive", 55000, 3),
	("Accountant", 50000, 3),
	("Marketing Manager",75000, 4),
	("HR Manager", 75000, 5),
	("Lawyer", 65000, 6),
	("Legal Team Lead", 70000, 6)
    ;
    
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter", 3, NULL),
	("Kelly", "Johnson", 1, 1),
	("Ron", "Wisley", 2, 1),
	("John", "Doe", 5, NULL),
	("Robert", "Cruz", 4, 4),
	("Hanna","Granger",7, NULL),
	("Joe","Smith", 11, NULL),
	("Max", "Rayman",10, 7)
    ;

