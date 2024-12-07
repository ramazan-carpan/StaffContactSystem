import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getContactByIdFromApi } from '../services/employeeApiService';

export default function DetailScreen({ route, navigation }) {
    const { id } = route.params;
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        getContactByIdFromApi(id)
            .then(employee => {
                setEmployee(employee);
            })
            .catch(error => {
                console.error('Error fetching employee details:', error);
                setEmployee(null); // Reset employee state on error
            });
    }, [id]);

    if (!employee) {
        return (
            <View style={styles.container}>
                <Text>Loading employee details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <Text>{employee.name}</Text>

            <Text style={styles.label}>Phone:</Text>
            <Text>{employee.phone}</Text>

            <Text style={styles.label}>Department:</Text>
            <Text>{employee.department}</Text>

            <Text style={styles.label}>Address:</Text>
            <Text>{formatAddress(employee.address)}</Text>

            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

// Helper function to format address for display
function formatAddress(address) {
    if (!address) return '';

    const { street, city, state, zip, country } = address;
    return `${street}, ${city}, ${state}, ${zip}, ${country}`;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 8,
    },
});
