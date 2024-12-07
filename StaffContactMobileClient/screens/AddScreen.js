import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Alert } from 'react-native'; 
import { postEmployeeToApi } from '../services/employeeApiService';

export default function AddScreen({ navigation }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');

    const saveEmployee = () => {
        const address = {
            street: street,
            city: city,
            state: state,
            zip: zip,
            country: country
        };

        postEmployeeToApi(name, phone, department, address)
            .then(() => {
                Alert.alert('Success', 'Employee added successfully', [
                    { text: 'OK', onPress: () => navigation.navigate('Home') }
                ]);
            })
            .catch((error) => {
                console.error('Error adding employee:', error);
                Alert.alert('Error', 'Failed to add employee');
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)} 
            />
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={text => setPhone(text)} 
            />
            <TextInput
                placeholder="Department"
                value={department}
                onChangeText={text => setDepartment(text)} 
            />
            <TextInput
                placeholder="Street"
                value={street}
                onChangeText={text => setStreet(text)} 
            />
            <TextInput
                placeholder="City"
                value={city}
                onChangeText={text => setCity(text)} 
            />
            <TextInput
                placeholder="State"
                value={state}
                onChangeText={text => setState(text)} 
            />
            <TextInput
                placeholder="ZIP"
                value={zip}
                onChangeText={text => setZip(text)}
            />
            <TextInput
                placeholder="Country"
                value={country}
                onChangeText={text => setCountry(text)} 
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 16,
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
