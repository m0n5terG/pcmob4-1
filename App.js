import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bus Arrival Time:`</Text>
      <Text style={styles.timeText}>Loading...</Text>
      <TouchableOpacity style={styles.button}>
        <Text styles={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '333333'
  },
  timeText: {
    marginBottom: 20,
    fontSize: 48,
    color: '#333333',
  },
  button: {
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: '#006400',
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'blue'

  }
});
