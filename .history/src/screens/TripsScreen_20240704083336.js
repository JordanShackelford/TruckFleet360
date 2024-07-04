import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const tripData = [
  { id: '1', title: 'Trip 1', date: '2030-07-01', distance: '120 km' },
  { id: '2', title: 'Trip 2', date: '2030-06-30', distance: '85 km' },
  { id: '3', title: 'Trip 3', date: '2030-06-29', distance: '150 km' },
  { id: '4', title: 'Trip 4', date: '2030-06-28', distance: '100 km' },
  { id: '5', title: 'Trip 5', date: '2030-06-27', distance: '130 km' },
];

function TripsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.tripItem}>
      <Text style={styles.tripTitle}>{item.title}</Text>
      <View style={styles.tripDetails}>
        <Text style={styles.tripDate}>{item.date}</Text>
        <Text style={styles.tripDistance}>{item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Details</Text>
      <FlatList
        data={tripData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingBottom: 20,
  },
  tripItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  tripTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tripDate: {
    fontSize: 16,
    color: '#6c757d',
  },
  tripDistance: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default TripsScreen;
