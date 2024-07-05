import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal, TextInput, ScrollView } from 'react-native';

function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    since: 2025,
    imageUrl: require('../../assets/profile.jpg'),
    email: 'john.doe@example.com',
    phone: '+1234567890',
    licenseNumber: 'ABC123',
    vehicle: 'Truck A',
  });

  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(profile.name);
  const [newEmail, setNewEmail] = useState(profile.email);
  const [newPhone, setNewPhone] = useState(profile.phone);
  const [newLicenseNumber, setNewLicenseNumber] = useState(profile.licenseNumber);
  const [newVehicle, setNewVehicle] = useState(profile.vehicle);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    // Simulated API call to update profile
    console.log('Saving profile changes:', newName, newEmail, newPhone, newLicenseNumber, newVehicle);
    setProfile({
      ...profile,
      name: newName,
      email: newEmail,
      phone: newPhone,
      licenseNumber: newLicenseNumber,
      vehicle: newVehicle,
    });
    setEditMode(false);
    // Replace with actual API integration to update profile
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Driver Profile</Text>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={() => console.log('Change profile photo')}
          >
            <Image
              source={profile.imageUrl}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileInfo}>Driver since {profile.since}</Text>

          {editMode ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.editInput}
                value={newName}
                onChangeText={setNewName}
                placeholder="Name"
                autoFocus
              />
              <TextInput
                style={styles.editInput}
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="Email"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.editInput}
                value={newPhone}
                onChangeText={setNewPhone}
                placeholder="Phone"
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.editInput}
                value={newLicenseNumber}
                onChangeText={setNewLicenseNumber}
                placeholder="License Number"
              />
              <TextInput
                style={styles.editInput}
                value={newVehicle}
                onChangeText={setNewVehicle}
                placeholder="Vehicle"
              />
            </View>
          ) : (
            <View style={styles.infoContainer}>
              <Text style={styles.profileLabel}>Email:</Text>
              <Text style={styles.profileText}>{profile.email}</Text>
              <Text style={styles.profileLabel}>Phone:</Text>
              <Text style={styles.profileText}>{profile.phone}</Text>
              <Text style={styles.profileLabel}>License Number:</Text>
              <Text style={styles.profileText}>{profile.licenseNumber}</Text>
              <Text style={styles.profileLabel}>Vehicle:</Text>
              <Text style={styles.profileText}>{profile.vehicle}</Text>
            </View>
          )}

          {editMode ? (
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60, // Ensure the image is fully rounded
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  profileInfo: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#03A9F4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  profileLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
});

export default ProfileScreen;
