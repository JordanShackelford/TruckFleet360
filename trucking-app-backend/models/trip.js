import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://localhost:3000'; // Verify this IP and port

function TripsScreen() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Fetching trips...');
      const response = await axios.get(`${API_URL}/api/trips`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Trips received:', response.data);
      setTrips(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching trips:', err);
      setError('Failed to fetch trips. Please try again.');
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const endLocation = item.endLocation || {};
    const address = endLocation.address || 'Unknown location';
    return (
      <TouchableOpacity style={styles.tripItem}>
        <Text style={styles.tripTitle}>{`Trip to ${address}`}</Text>
        <View style={styles.tripDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={16} color="#666" />
            <Text style={styles.tripDate}>{new Date(item.startDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="car" size={16} color="#666" />
            <Text style={styles.tripDistance}>{item.distance.value} {item.distance.unit}</Text>
          </View>
        </View>
        <Text style={styles.tripStatus}>Status: {item.status}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Details</Text>
      {trips.length === 0 ? (
        <View style={styles.centered}>
          <Text>No trips found.</Text>
        </View>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  tripItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  tripDistance: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  tripStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default TripsScreen;
