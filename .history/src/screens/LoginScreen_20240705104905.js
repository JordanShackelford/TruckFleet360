import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

//const API_URL = 'http://172.20.10.3:3000'; // Your backend IP and port

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    console.log('Attempting login with:', email, password);
    try {
      console.log('Sending request to:', `${API_URL}/api/login`);
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('Response received. Status:', response.status);
      
      const textResponse = await response.text();
      console.log('Raw response:', textResponse);
      
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (e) {
        console.error('Error parsing JSON:', e);
        Alert.alert('Error', 'Invalid response from server');
        return;
      }
      
      console.log('Parsed response data:', data);
      
      if (data.success) {
        console.log('Login successful:', data.token);
        navigation.replace('Main');
      } else {
        console.log('Login failed:', data.message);
        Alert.alert('Login Failed', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Check console for details.');
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
