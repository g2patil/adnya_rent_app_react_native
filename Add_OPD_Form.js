import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { UserContext } from './UserContext';
import { DataTable } from 'react-native-paper';

const Add_OPD_Form = ({ navigation,setUser_id }) => {
  const { user_id } = useContext(UserContext); 
  const [patientId, setPatientId] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [findings, setFindings] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const { width, height } = Dimensions.get('window');
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
     console.log("Doc :--"+user_id);
    const dataToSend = {
      patientId,
      "doctorId":user_id,
      findings,
      treatmentPlan,
      reasonForVisit,
    };
    console.log("p="+JSON.stringify(dataToSend));
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
          <View style={styles.container}>
          <DataTable>
            <DataTable.Header style={styles.header}>
              <DataTable.Title style={styles.title}>Label</DataTable.Title>
              <DataTable.Title style={styles.title}>Details</DataTable.Title>
            </DataTable.Header>
    
            <DataTable.Row>
              <DataTable.Cell style={styles.labelCell}>Patient Name:</DataTable.Cell>
              <DataTable.Cell style={styles.valueCell}>{patientDetails.firstName} {patientDetails.lastName}</DataTable.Cell>
            </DataTable.Row>
    
            <DataTable.Row>
              <DataTable.Cell style={styles.labelCell}>Contact Number:</DataTable.Cell>
              <DataTable.Cell style={styles.valueCell}>{patientDetails.contactNumber}</DataTable.Cell>
            </DataTable.Row>
    
            <DataTable.Row>
              <DataTable.Cell style={styles.labelCell}>Address:</DataTable.Cell>
              <DataTable.Cell style={styles.valueCell}>{patientDetails.address}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
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
    marginLeft:10,
    borderRadius: 5,
    borderColor: '#005EB8',
    backgroundColor: '#FFFFFF',
    width: width * 0.88,
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
  container: {
    margin: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f4f4f4',
  },
  title: {
    color: '#333',
    fontWeight: 'bold',
  },
  labelCell: {
    flex: 2,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    backgroundColor: '#f9f9f9',
  },
  valueCell: {
    flex: 3,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize:12,
    color:'#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
});




export default Add_OPD_Form;
