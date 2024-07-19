// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import OtherScreen from './OtherScreen';
import CreateBldg from './CreateBldg';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={HomeScreen} />
        <Stack.Screen name="Add_bldg" component={CreateBldg} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
