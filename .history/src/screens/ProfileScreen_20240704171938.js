import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Modal, TextInput } from 'react-native';

function ProfileScreen() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    since: 2025,
    imageUrl: require('../../assets/profile.jpg'),
  });

  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(profile.name); // State for edited name

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    // Send updated profile data to backend (simulated here)
    console.log('Saving profile changes:', newName);
    setProfile({ ...profile, name: newName });
    setEditMode(false);
    // Replace with actual API integration to update profile
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Driver Profile</Text>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={profile.imageUrl}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
          {editMode ? (
            <TextInput
              style={styles.editInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter new name"
              autoFocus
            />
          ) : (
            <Text style={styles.profileName}>{profile.name}</Text>
          )}
          <Text style={styles.profileInfo}>Driver since {profile.since}</Text>
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
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
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
  },
  saveButton: {
    backgroundColor: '#03A9F4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
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
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;
