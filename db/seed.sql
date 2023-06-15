INSERT INTO department (name) VALUES
('Sales'),
('Marketing'),
('Engineering');

INSERT INTO role (title, department_id) VALUES
('Sales Executive', 1),
('Marketing Manager', 2),
('Software Engineer', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, null),
('Jane', 'Doe', 2, 1),
('Jack', 'Doe', 3, 1);
