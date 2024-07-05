import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ImageBackground, Modal, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

function SettingsScreen() {
  const navigation = useNavigation(); // Navigation hook for navigating between screens
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Light');
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(prev => !prev);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setModalVisible(false); // Close modal after selection
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleChangeEmail = () => {
    // Implement logic to change email
    Alert.alert('Email Changed', `Email changed to: ${email}`);
    setEmail(''); // Clear input after changing email
  };

  const handleChangePassword = () => {
    // Implement logic to change password
    Alert.alert('Password Changed', 'Password successfully changed');
    setPassword(''); // Clear input after changing password
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>

        {/* Dark Mode */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkModeEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={darkModeEnabled}
          />
        </View>

        {/* Language Selection */}
        <TouchableOpacity style={styles.section} onPress={() => setModalVisible(true)}>
          <Text style={styles.sectionTitle}>Language</Text>
          <Text style={styles.sectionText}>{language}</Text>
        </TouchableOpacity>

        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <TouchableOpacity
            style={[styles.themeButton, theme === 'Light' && styles.themeButtonSelected]}
            onPress={() => handleThemeChange('Light')}
          >
            <Text style={styles.themeButtonText}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeButton, theme === 'Dark' && styles.themeButtonSelected]}
            onPress={() => handleThemeChange('Dark')}
          >
            <Text style={styles.themeButtonText}>Dark</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AccountSettings')}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Text style={styles.sectionText}>Manage your account</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        {/* Language Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity style={styles.modalOption} onPress={() => handleLanguageChange('English')}>
                <Text style={styles.modalOptionText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => handleLanguageChange('Spanish')}>
                <Text style={styles.modalOptionText}>Spanish</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => handleLanguageChange('French')}>
                <Text style={styles.modalOptionText}>French</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionText: {
    fontSize: 18,
    color: '#fff',
  },
  switchContainer: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], // Adjust size of switch for better touch response
  },
  button: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  themeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  themeButtonSelected: {
    backgroundColor: '#17a2b8',
  },
  themeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
