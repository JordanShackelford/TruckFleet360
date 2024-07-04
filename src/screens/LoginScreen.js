import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const mockAuth = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        resolve({ success: true, user: { id: 1, name: 'Test User' } });
      } else {
        reject({ success: false, message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    try {
      const result = await mockAuth(email, password);
      if (result.success) {
        console.log('Login successful:', result.user);
        navigation.replace('Main');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>TruckFleet 2030</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#4ecca3"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#4ecca3"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.biometricLogin}>
          <FontAwesome name="fingerprint" size={24} color="#4ecca3" />
          <Text style={styles.biometricText}>Biometric Login</Text>
        </TouchableOpacity>
      </View>
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
  loginBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#4ecca3',
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#4ecca3',
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#03e9f4',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  biometricLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  biometricText: {
    color: '#4ecca3',
    marginLeft: 10,
  },
  errorText: {
    color: '#ff0033',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
});

export default LoginScreen;