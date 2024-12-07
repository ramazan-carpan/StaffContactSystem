import { Platform } from 'react-native';

export function getContactsFromApi() {
    const baseUrl = getServerAddress();
    return fetch(new URL("/api/employee/all", baseUrl))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject("There was an error fetching the data from the service!");
        });
}

export function getContactByIdFromApi(employeeId) {
    const baseUrl = getServerAddress();
    const fullUrl = new URL(`/api/employee?id=${employeeId}`, baseUrl); 

    return fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch employee data');
            }
            return response.json();
        });
}



export function postEmployeeToApi(name, phone, department, address) {
    const baseUrl = getServerAddress();
    const fullUrl = new URL("/api/employee", baseUrl);

    return fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            phone,
            department,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip,
                country: address.country
            }
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Did not save employee correctly!');
        }
    })
    .catch(error => {
        console.error('Error in postContactToApi:', error);
        throw error; // Rethrow to propagate the error
    });
}
export function updateContactToApi(contactUpdate) {
    const { id, name, phone, department, address } = contactUpdate;
    const { street, city, state, zip, country } = address;
    
    const baseUrl = getServerAddress();
    const fullUrl = new URL(`/api/employee`, baseUrl); // Interpolate id properly

    return fetch(fullUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            name: name,
            phone: phone,
            department: department,
            address: {
                street: street,
                city: city,
                state: state,
                zip: zip,
                country: country,
            }
        })
    })
    .then(response => {
        if (response.ok) {
            return Promise.resolve(); // Resolve without any specific value
        } else {
            throw new Error('Did not update contact correctly!');
        }
    })
    .catch(error => {
        console.error('Error in updateContactToApi:', error);
        throw error; // Rethrow to propagate the error
    });
}



function getServerAddress() {
    if (Platform.OS === "web") {
        return "http://localhost:3000";  // Make sure this matches your server URL
    } else if (Platform.OS === "android") {
        return "http://10.0.2.2:3000";  // For Android emulator
    } else {
        throw new Error("Unsupported mobile platform detected");
    }
}
