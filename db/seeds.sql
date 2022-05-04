USE employees;

INSERT INTO department  
    (name)
VALUES
    ("Engineering"),
    ("Human Resources"),
    ("Warehouse"),
    ("Legal");
   

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Senior Developer", 100000, 1),
    ("HR Business Partner", 200000, 2),
    ("Operations Manager", 120000, 3),
    ("Lawyer", 90000, 4);
   
INSERT INTO employees
    (first_name, last_name, role_id)
VALUES
    ("John", "smith", 1),
    ("Joe", "Doe", 2),
    ("Carol", "Danvers", 3),
    ("Matt", "Murdock", 4);