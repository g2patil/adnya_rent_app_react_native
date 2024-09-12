// LoginScreen.js
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';
import {Image,

  TouchableOpacity,StyleSheet, View, Text, Button 		,  TextInput} from 'react-native';
import CreateBldg from "./CreateBldg";
import { UserContext } from './UserContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser_id, setSession_Id } = useContext(UserContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log('Before fetch request');
      const response = await fetch('http://192.168.1.114:8082/adnya/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
  
      console.log('after fetch request');
      if (response.ok) {
        const data = await response.json();
        const sessionId = data.sessionId;
  
        await AsyncStorage.setItem('sessionId', sessionId);
        console.log('Backend Session ID:', sessionId);
  
        // Check cookies
        const cookies = await CookieManager.get('http://192.168.1.114:8082');
        console.log('Cookies:', cookies.JSESSIONID);
        console.log('JSESSIONID Value:', cookies.JSESSIONID ? cookies.JSESSIONID.value : 'No JSESSIONID cookie');
  
        // Set cookie
     /*   await CookieManager.set('http://192.168.1.114:8082', {
          name: 'JSESSIONID',
          value: sessionId,
          path: '/',
          expires: new Date(Date.now() + 3600 * 1000).toUTCString(),
          
        });*/
  
        // Fetch user data
        const userResponse = await fetch(`http://192.168.1.114:8082/adnya/users/find/${email}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser_id(userData.id);
          setSession_Id(sessionId);
          navigation.navigate("Menu");
        } else {
          alert("Failed to fetch user data.");
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
/*
  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log('Before fetch request');
      const response = await fetch('http://192.168.1.114:8082/adnya/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
        
      });
   //   console.log('Response status:', response.status);
  //    console.log('Response body:', await response.text());  

      console.log('after fetch request');
      if (response.ok) {
        const data = await response.json();
        const sessionId = data.sessionId;
      await AsyncStorage.setItem('sessionId', data.sessionId);
        console.log('Backend Session ID:', data.sessionId);

        console.log('in response ok');
        const checkCookies = async () => {
          const cookies = await CookieManager.get('http://192.168.1.114:8082');
          //console.log('Cookies: ', cookies);
          console.log('JSESSIONID Value:', cookies.JSESSIONID.value);
        };

        checkCookies();

        await AsyncStorage.setItem('sessionId', sessionId);
        await CookieManager.set('http://192.168.1.114:8082', {
          name: 'JSESSIONID',
          value: sessionId,
          path: '/',
          expires: new Date(Date.now() + 3600 * 1000).toUTCString(),
        });

        const userResponse = await fetch(`http://192.168.1.114:8082/adnya/users/find/${email}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser_id(userData.id);
          setSession_Id(sessionId);
          navigation.navigate("Menu");
        } else {
          alert("Failed to fetch user data.");
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
*/
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
  borderRadius: 10,
  width: "70%",
  height: 45,
  marginBottom: 20,
  paddingLeft: 20,
 // alignItems: "center",
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
  borderRadius: 10,
  height:40,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 40,
  backgroundColor: "#f39c12",  
  placeholderTextColor: "#f8c471",
  },
});

export default LoginScreen;
