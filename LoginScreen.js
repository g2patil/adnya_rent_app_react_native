// LoginScreen.js
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {Image,

  TouchableOpacity,StyleSheet, View, Text, Button 		,  TextInput} from 'react-native';
import CreateBldg from "./CreateBldg";
import { UserContext } from './UserContext';
const LoginScreen = ({ navigation }) => {
   
  //const [user_id, setUser_id] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser_id } = useContext(UserContext); 
 // console.log('E MAIL', email);
 // console.log('Password', password);
  const dataToSend = { username: email, password: password };
/*
  console.log('*****'+JSON.stringify(   dataToSend//{ 
    //  cust_mob: '9960059223',
     // password: 'padnyaj'
  //  }
  ));*/
    const handleLogin = async () => {
    //  console.log('E MAIL', email);
    //  console.log('pwd', password);
 //   
    try {
        
      // Perform login authentication here
      // For example, you might send a request to your server
      // and await the response to determine if login is successful
      const response = await fetch('http://192.168.1.114:8082/adnya/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(   dataToSend//{ 
             ),
      }); 
      
      const data = await response.json();
    //  console.log('*****'+response.status);
      console.log('*****'+data);
     /* 
     
       */
       console.log("STATUS : "+response.ok);
       console.log("DATA : "+data);




      if (/*response.ok*/ response.status==200 && data==true ) {  
       /************* */
       const response1 = await fetch('http://192.168.1.114:8082/adnya/users/find/'+email+'', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
       
      }); 
      
      const data1 = await response1.json();
    //  console.log('*****'+response.status);
    //  setId(data1.id); // Store the id globally  
      setUser_id(data1.id);
      console.log('DDDDDDDDD'+data1.id);
      console.log('Data as string:', JSON.stringify(data1, null, 2));
       
       /************ */

        navigation.navigate("Menu");  
      } else {
        // If login failed, handle the error
        // For example, display an error message
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any unexpected errors
      alert("An unexpected error occurred. Please try again later.");
    }
  };




  return (
  

    <View style={styles.container}>
			  <Image style={styles.image} source={require("./assets/Adnya_tech_logo.png")} /> 
			  <StatusBar style="auto" />
			  <View style={styles.inputView}>
       
						<TextInput
						  style={styles.TextInput}	
              placeholder="Email/Mobile Number."
						  placeholderTextColor="#f8c471"
						  onChangeText={(text) => setEmail(text)}
						/> 
			  </View> 
			  <View style={styles.inputView}>
				<TextInput
				  style={styles.TextInput}
				  placeholder="Password."
				  placeholderTextColor="#f8c471"
				  secureTextEntry={true}
				  onChangeText={(password) => setPassword(password)}
				/> 
			  </View>

		  

			  <TouchableOpacity  >
				<Text style={styles.forgot_button}>Forgot Password?</Text> 
			  </TouchableOpacity> 
			  <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
				<Text style={styles.loginText}>LOGIN</Text> 
			  </TouchableOpacity> 

			</View>     


    
  );




  
  };

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  },
  image: {
  marginBottom: 40,
  },
  inputView: {
  backgroundColor: "#f8c471",
  borderRadius: 30,
  width: "70%",
  height: 45,
  marginBottom: 20,
  alignItems: "center",
  },
  TextInput: {
  height: 50,
 
  },
  forgot_button: {
  height: 30,
  marginBottom: 30,
  },
  loginBtn: {
  width: "40%",
  borderRadius: 25,
  height:40,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 40,
  backgroundColor: "#f39c12",  
  placeholderTextColor: "#f8c471",
  },
});

export default LoginScreen;
