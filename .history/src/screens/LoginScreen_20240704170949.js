import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const API_URL = 'http://172.20.10.3:3000'; // Your backend IP and port

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    console.log('Attempting login with:', email, password);
    try {
      console.log('Sending request to:', `${API_URL}/api/login`);
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 10000); // Timeout after 10 seconds
      });
  
      const fetchPromise = fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const response = await Promise.race([fetchPromise, timeoutPromise]);
  
      if (!response) {
        throw new Error('Request timed out');
      }
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        throw new Error('Server responded with error status');
      }
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (data.success) {
        console.log('Login successful:', data.token);
        navigation.replace('Main');
      } else {
        console.log('Login failed:', data.message);
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Request timed out') {
        Alert.alert('Error', 'Request timed out. Please try again later.');
      } else if (error.message === 'Server responded with error status') {
        Alert.alert('Error', 'Server responded with an error status. Please try again later.');
      } else {
        Alert.alert('Error', 'Failed to connect to the server. Please check your network connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#4ecca3',
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#03e9f4',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
