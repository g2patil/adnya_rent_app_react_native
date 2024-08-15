// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import OtherScreen from './OtherScreen';
import CreateBldg from './CreateBldg';
import { UserProvider } from './UserContext';
import Add_Patient_Form from './Add_Patient_Form';
import Add_OPD_Form from './Add_OPD_Form';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={HomeScreen} />
        <Stack.Screen name="Add_bldg" component={CreateBldg} />
        <Stack.Screen name="Add_Patient" component={Add_Patient_Form} />
        <Stack.Screen name="Add_Opd" component={Add_OPD_Form} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;
