import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo

function HomeScreen() {
  const handleStartTrip = () => {
    Alert.alert('Start New Trip', 'Functionality to start a new trip will be implemented soon!');
  };

  return (
    <ImageBackground 
      source={require('../../assets/futuristic-highway.png')}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.overlay}
      >
        <Text style={styles.title}>TruckFleet360</Text>
        <Text style={styles.subtitle}>The Future of Trucking</Text>
        <View style={styles.statsContainer}>
          <StatBox title="Efficiency" value="98%" />
          <StatBox title="Miles Today" value="342" />
          <StatBox title="Fuel Saved" value="12%" />
        </View>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={handleStartTrip}
          activeOpacity={0.9}
        >
          <View style={styles.buttonWrapper}>
            <FontAwesome name="road" size={24} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Start New Trip</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedbackButton} onPress={handleFeedback}>
          <FontAwesome name="comment" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Provide Feedback</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}

function StatBox({ title, value }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const handleFeedback = () => {
  // Placeholder for handling feedback submission
  Alert.alert('Feedback', 'Please provide your feedback here.');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00FFFF',
    textShadowColor: 'rgba(0, 255, 255, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    minWidth: 100,
  },
  statTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },
  statValue: {
    color: '#00FFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  startButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonWrapper: {
    backgroundColor: '#FF00FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
