import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function HomeScreen() {
  return (
    <ImageBackground 
      source={require('../../assets/futuristic-highway.jpg')} 
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
        <TouchableOpacity style={styles.startButton} onPress={handleStartTrip}>
          <Text style={styles.buttonText}>Start New Trip</Text>
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

const handleStartTrip = () => {
  // Logic to start a new trip, e.g., navigate to the Trip creation screen
  console.log('Start New Trip');
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
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00FFFF',
    textShadowColor: 'rgba(0, 255, 255, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center', // Improved accessibility
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    minWidth: 100, // Ensure consistent sizing
  },
  statTitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  statValue: {
    color: '#00FFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#FF00FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
