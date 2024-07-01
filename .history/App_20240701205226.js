import React from 'react';
import { Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  try {
    return <AppNavigator />;
  } catch (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred: {error.message}</Text>
      </View>
    );
  }
}