const express = require('express');
const cors = require('cors');
const employeeService = require('./employeeService.js');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/employee/all', (req, res) => {
    const data = employeeService.getAll();
    res.json(data);
});

app.get('/api/employee', (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).send('Missing the query string parameter \'id\'!');
        return;
    }
    const id = parseInt(req.query.id);
    if (isNaN(id)) {
        res.status(400).send('The \'id\' parameter MUST be an integer value!');
        return;
    }
    
    const employee = employeeService.getById(id);

    if (employee !== null) {
        res.json(employee);
    } else {
        res.status(404).send(`The employee with an id of ${id} could not be found!`);
    }
});

app.post('/api/employee', (req, res) => {
    const { name, phone, department, address } = req.body;

    if (!address) {
        return res.status(400).send('Address is required');
    }

    const newEmployee = employeeService.addEmployee(
        name, 
        phone, 
        department, 
        address.street, 
        address.city, 
        address.state, 
        address.zip, 
        address.country
    );

    res.status(201).json(newEmployee);
});

app.put('/api/employee', (req, res) => {
    
    const {id, name, phone, department, address } = req.body;

    const { street, city, state, zip, country } = address;

    const employee = employeeService.getById(id);

    if (!employee) {
        return res.status(404).send(`Employee with ID ${id} not found`);
    }

    // Update employee properties
    employee.name = name;
    employee.phone = phone;
    employee.department = department;
    employee.address = {
        street: street,
        city: city,
        state: state,
        zip: zip,
        country: country,
    };

    employeeService.updateEmployee(employee); // Update employee in service or database

    res.send(); // Respond with success
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
