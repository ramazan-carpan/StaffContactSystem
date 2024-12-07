import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddScreen from './screens/AddScreen.js';
import EditScreen from './screens/EditScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import DetailScreen from './screens/DetailScreen.js';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Add" component={AddScreen}  />
                <Stack.Screen name="Edit" component={EditScreen} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
