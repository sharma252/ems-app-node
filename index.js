const express = require('express');
const app = express();
const employees = require("./src/employees")

const PORT = 3000;

// Middleware
app.use(express.json());
// console.log(employees)

// test employees
app.get('/', (req, res) => {
  res.json("Api is working fine...");
});

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Get an employee by ID
app.get('/employees/:id', (req, res) => {
  const employee = employees?.find(emp => emp.id === parseInt(req.params.id));
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  res.json(employee);
});

// Create a new employee
app.post('/employees/add', (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    salary: req.body.salary
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Update an existing employee
app.put('/employees/:id', (req, res) => {
  const employeeIndex = employees?.findIndex(emp => emp.id === parseInt(req.params.id));
  if (employeeIndex === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  const updatedEmployee = {
    id: parseInt(req.params.id),
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    salary: req.body.salary
  };
  employees[employeeIndex] = updatedEmployee;
  res.json(updatedEmployee);
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const employeeIndex = employees.findIndex(emp => emp.id === parseInt(req.params.id));
  if (employeeIndex === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  employees.splice(employeeIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports =  app;
