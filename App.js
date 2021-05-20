import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {

  const [loading, setLoading] = useState(true)
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  const [arrival, setArrival] = useState("")


  const loadBusStopData = () => {

   // setLoading(true);

    fetch(BUSSTOP_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log("Original Data:");
      
      const myBus = responseData.services.filter(
        (item) => item.no === "155"
      )[0];

      console.log("My Bus:");
      console.log(myBus);
      setArrival(myBus.next.time)
      setLoading(false)
    })
  };

 /* useEffect(() => {
    const interval = setInterval(loadBusStopData, 10000);
    return () => clearInterval(interval);
  }, []); */

  useEffect(() => {
    loadBusStopData();
  }), [];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bus Arrival Time:</Text>
      <Text style={styles.timeText}>
        {loading ? <ActivityIndicator size="large"/> : arrival}</Text>
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
    color: '#333333'
  },
  timeText: {
    marginBottom: 20,
    alignContent: 'center',
    fontSize: 48,
    color: '#333333'
  },
  button: {
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'red',
    padding: 20

  }
});
