import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput, Alert, ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker component
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker component
import { UserContext } from './UserContext';

const Add_Patient_Form = ({ navigation }) => {
  const { user_id } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = () => {
    if (!firstName || !lastName || !dateOfBirth || !gender || !contactNumber || !email || !address) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const dataToSend = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toISOString().split('T')[0], // Convert date to YYYY-MM-DD format
      gender,
      contactNumber,
      email,
      address,
      userId: user_id,
    };

    fetch('http://192.168.1.114:8082/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
      Alert.alert('Success', 'Patient data saved successfully');
      navigation.navigate('Home');
    })
    .catch(error => {
      Alert.alert('Error', 'Failed to save patient data');
    });
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter first name"
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter last name"
        />

        <Text style={styles.label}>Date of Birth:</Text>
        <TouchableOpacity onPress={showDatePickerHandler} style={styles.input}>
          <Text>{dateOfBirth.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()} // Optional: prevent selecting future dates
          />
        )}

        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

        <Text style={styles.label}>Contact Number:</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          placeholder="Enter contact number"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email"
        />

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register Patient</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
    width: '100%',
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 25, // Rounded corners
    borderColor: '#FFD700', // Golden border color
    backgroundColor: '#FFD700', // Golden background color
    width: width * 0.9, // Make input width responsive
  },
  picker: {
    height: 50,
    width: width * 0.9,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFD700', // Golden color
    borderRadius: 25, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Add_Patient_Form;
