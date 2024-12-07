import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getContactsFromApi } from '../services/employeeApiService';

export default function HomeScreen({ navigation }) {
    const [employeeData, setEmployeeList] = useState([]);

    useFocusEffect(React.useCallback(() => {
        getContactsFromApi()
            .then((data) => setEmployeeList(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []));

    return (
        <View style={styles.container}>
            <Button
                title='Add Employee'
                onPress={() => navigation.navigate('Add')}
            />
            <FlatList
                data={employeeData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EmployeePeople employeeData={item} navigation={navigation} />
                )}
            />
        </View>
    );
}

function EmployeePeople({ employeeData, navigation }) {
    return (
        <View style={styles.employeePeople}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16 }}>{employeeData.name}</Text>
            </View>
            <View style={styles.buttonPadding}>
                <Button title="Details" onPress={() => navigation.navigate('Detail', { id: employeeData.id })} />
            </View>
            <View>
                <Button title="Edit" onPress={() => navigation.navigate('Edit', { id: employeeData.id })} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    employeePeople: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    buttonPadding: {
        marginRight: 10, 
    },
});
