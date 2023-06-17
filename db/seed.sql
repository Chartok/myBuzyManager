INSERT INTO department (name) VALUES
('Sales'),
('Marketing'),
('Engineering');

INSERT INTO role (title, department_id, salary) VALUES
('Sales Executive', 1, 50000),
('Marketing Manager', 2, 60000),
('Software Engineer', 3, 70000);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, null),
('Jane', 'Doe', 2, 1),
('Jack', 'Doe', 3, 1);
