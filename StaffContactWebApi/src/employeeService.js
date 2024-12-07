const employeeData = [
    {
        id: 1,
        name: 'John Smith',
        phone: '02 9988 2211',
        department: 'Department 1',
        address: {
            street: '1 Code Lane',
            city: 'Javaville',
            state: 'NSW',
            zip: '0100',
            country: 'Australia'
        }
    },
    {
        id: 2,
        name: 'Sue White',
        phone: '03 8899 2255',
        department: 'Department 2',
        address: {
            street: '16 Bit Way',
            city: 'Byte Cove',
            state: 'QLD',
            zip: '1101',
            country: 'Australia'
        }
    },
    {
        id: 3,
        name: 'Bob O’Bits',
        phone: '05 7788 2255',
        department: 'Department 3',
        address: {
            street: '8 Silicon Road',
            city: 'Cloud Hills',
            state: 'VIC',
            zip: '1001',
            country: 'Australia'
        }
    },
    {
        id: 4,
        name: 'Mary Blue',
        phone: '06 4455 9988',
        department: 'Department 2',
        address: {
            street: '4 Processor Boulevard',
            city: 'Appletson',
            state: 'NT',
            zip: '1010',
            country: 'Australia'
        }
    },
    {
        id: 5,
        name: 'Mick Green',
        phone: '02 9988 1122',
        department: 'Department 3',
        address: {
            street: '700 Bandwidth Street',
            city: 'Bufferland',
            state: 'NSW',
            zip: '0110',
            country: 'Australia'
        }
    }
];

function getAll() {
    return employeeData.slice();
}

function getById(id) {
    return employeeData.find(employee => employee.id === id) || null;
}

function addEmployee(name, phone, department, street, city, state, zip, country) {
    const newEmployee = {
        id: getNextId(),
        name,
        phone,
        department,
        address: {
            street,
            city,
            state,
            zip,
            country
        }
    };

    employeeData.push(newEmployee);
    return newEmployee;
}

function updateEmployee(updatedEmployee) {
    const index = employeeData.findIndex(employee => employee.id === updatedEmployee.id);

    if (index !== -1) {
        employeeData[index] = updatedEmployee;
    }
}

let lastID = employeeData.length;

function getNextId() {
    return ++lastID;
}

module.exports = {
    getAll,
    getById,
    addEmployee,
    updateEmployee
};
