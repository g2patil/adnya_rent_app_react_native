import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const Add_OPD_Form = ({ navigation }) => {
  const [patientId, setPatientId] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [findings, setFindings] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');

  const fetchPatientDetails = () => {
    if (patientId === '') {
      Alert.alert('Error', 'Patient ID cannot be empty');
      return;
    }

    fetch(`http://192.168.1.114:8082/adnya/patient/find/${patientId}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setPatientDetails(data);
          console.log("Patient data:", data);
          // Populate the form fields with patient data as needed
        } else {
          Alert.alert('Error', 'No patient found with the given ID');
          setPatientDetails(null); // Clear patientDetails when no data is found
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to fetch patient details');
        setPatientDetails(null); // Clear patientDetails on error
      });
  };

  const handlePatientIdChange = (value) => {
    setPatientId(value);
    fetchPatientDetails();
  };

  const handleRegister = () => {
    if (!patientId || !findings || !treatmentPlan || !reasonForVisit) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const dataToSend = {
      patientId,
      findings,
      treatmentPlan,
      reasonForVisit,
    };

    fetch('http://192.168.1.114:8082/adnya/register/opd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Success', 'OPD data saved successfully');
        // Reset form fields
        setPatientId('');
        setFindings('');
        setTreatmentPlan('');
        setReasonForVisit('');
        setPatientDetails(null);
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to save OPD data');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.label}>Patient ID:</Text>
        <TextInput
          style={styles.input}
          value={patientId}
          onChangeText={setPatientId}
          onBlur={fetchPatientDetails}  // Call fetchPatientDetails when input loses focus
          placeholder="Enter patient ID"
          placeholderTextColor="#5F6368"
        />

        {/* Conditionally render patient details if available */}
        {patientDetails && (
          <>
            <Text style={styles.label1}>Patient Name : </Text><Text style={styles.label2}>{patientDetails.firstName} {patientDetails.lastName}</Text>
            <Text style={styles.label1}>Contact Number : </Text><Text style={styles.label2}> {patientDetails.contactNumber}</Text>
            <Text style={styles.label1}>Address : </Text><Text style={styles.label2}> {patientDetails.address}</Text>
       
          </>
        )}

        <Text style={styles.label}>Reason for Visit:</Text>
        <TextInput
          style={styles.input}
          value={reasonForVisit}
          onChangeText={setReasonForVisit}
          placeholder="Enter reason for visit"
          placeholderTextColor="#5F6368"
        />

        <Text style={styles.label}>Findings:</Text>
        <TextInput
          style={styles.input}
          value={findings}
          onChangeText={setFindings}
          placeholder="Enter findings"
          placeholderTextColor="#5F6368"
        />

        <Text style={styles.label}>Treatment Plan:</Text>
        <TextInput
          style={styles.input}
          value={treatmentPlan}
          onChangeText={setTreatmentPlan}
          placeholder="Enter treatment plan"
          placeholderTextColor="#5F6368"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register OPD</Text>
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
    backgroundColor: '#F4F4F4',
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
    color: '#005EB8',
  },
  label1: {
    marginVertical: 2,
    fontWeight: 'normal',
    fontSize: 12,
    width: '80%',
    textAlign: 'center',
    color: '#005EB8',
  },

  label2: {
    marginVertical: 2,
    fontWeight: 'bold',
    fontSize: 14,
    width: '80%',
    textAlign: 'center',
    color: '#ff5EB8',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#005EB8',
    backgroundColor: '#FFFFFF',
    width: width * 0.9,
  },
  button: {
    backgroundColor: '#005EB8',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Add_OPD_Form;
