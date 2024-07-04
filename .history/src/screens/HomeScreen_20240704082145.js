import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function HomeScreen() {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleStartTrip = () => {
    // Example animation on button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('Start New Trip');
      // Add logic to navigate to trip creation screen or fetch data
    });
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
          <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.buttonText}>Start New Trip</Text>
          </Animated.View>
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
