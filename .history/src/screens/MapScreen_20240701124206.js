import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map View</Text>
      <Text style={styles.text}>Map Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#6c757d',
  },
});

export default MapScreen;
