

    // screens/OtherScreen.js

 

    import React, { useState } from 'react';
    import { StyleSheet, Text,Button, View, TextInput, TouchableOpacity, Alert } from 'react-native';
    
    const CreateBldg = ({ navigation }) => {
      const [bldg_name, setName] = useState('');
      const [bldg_loc, setbldg_loc] = useState('');
      const dataToSend = { bldg_name: bldg_name, bldg_loc: bldg_loc };
      console.log('*****'+JSON.stringify(   dataToSend//{ 
        //  cust_mob: '9960059223',
         // password: 'padnyaj'
      //  }
      ));



      const handleRegister = () => {
        if (!bldg_name || !bldg_loc ) {
          Alert.alert('Error', 'Please fill all fields');
          return;
        }
    
        // Add your registration logic here
    
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Home');
      };
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Create Building</Text>
          <TextInput
            style={styles.input}
            placeholder="bldg_name"
            value={bldg_name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="bldg_loc"
            value={bldg_loc}
            onChangeText={setbldg_loc}
          //  keyboardType="email-address"
          />
         
        
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        

          <Button style={styles.button}
        title="Go back"
        onPress={() => navigation.goBack()}
      />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 20,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
      },
    });
    
    export default CreateBldg;
    
      
 