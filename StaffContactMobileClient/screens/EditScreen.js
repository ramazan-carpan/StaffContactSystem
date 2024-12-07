import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getContactByIdFromApi, updateContactToApi } from '../services/employeeApiService';

export default function EditScreen({ navigation, route }) {
    const id  = route.params.id; //this is for id 

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    

    function updateEmployee (employee) {
        const { name, phone, department, address } = employee;
        const { street, city, state, zip, country } = address;
    
        setName(name);
        setPhone(phone);
        setDepartment(department);
        setStreet(street);      
        setCity(city);          
        setState(state);        
        setZip(zip);           
        setCountry(country);    
    }

    useFocusEffect(
        React.useCallback(() => {
            getContactByIdFromApi(id)
            .then((employee)=>{
                updateEmployee(employee);
            })
            .catch((error)=>{
                console.log(error)
            });
        },[id])
    );
    // Function to update state with fetched employee data
    

    // Function to save updated employee data
    const saveEmployee = function(e){
        // Validation: Check if all fields are filled
        if (!name || !phone || !department || !street || !city || !state || !zip || !country) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const addressData = {
            street,
            city,
            state,
            zip,
            country,
        };

        const updatedEmployee = {
            id: id,
            name,
            phone,
            department,
            address: addressData,
        };

        updateContactToApi(updatedEmployee)

        .then(() =>{
            Alert.alert('Success','employee updated succecfully',[
                {text:'OK', onPress :() => navigation.navigate('Home')}
            ]);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    // Render form fields and save button
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Department"
                value={department}
                onChangeText={(text) => setDepartment(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Street"
                value={street}
                onChangeText={(text) => setStreet(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={(text) => setCity(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="State"
                value={state}
                onChangeText={(text) => setState(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Zip Code"
                value={zip}
                onChangeText={(text) => setZip(text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Country"
                value={country}
                onChangeText={(text) => setCountry(text)}
            />
             <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        title="Save"
                        onPress={saveEmployee}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Go Back"
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>
            </View>
        </View>
    );
};      

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button:{
        marginHorizontal:5,
        flex:1,
    },
    buttonContainer :{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
    }
});
