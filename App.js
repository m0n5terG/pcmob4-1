import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=85041";
  const [arrival, setArrival] = useState("");
  const [arrivalNext, setArrivalNext] = useState("");
  const [duration, setDuration] = useState("");

  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("Original Data:");

        const myBus = responseData.services.filter(
          (item) => item.no === "10"
        )[0];
        console.log(myBus);

        let localTime = new Date(myBus.next.time).toLocaleTimeString("en-US");
        setArrival(localTime);

        const diffTime = Math.floor(myBus.next["duration_ms"] / 1000);
        const mins = Math.floor(diffTime / 60);

        if (diffTime < 0) {
          setDuration(`Bus has arrived`);
        } else {
          setDuration(`Bus arriving in ${mins} minutes`);
        }

        let localTime2 = new Date(myBus.subsequent.time).toLocaleTimeString(
          "en-US"
        );
        setArrivalNext(localTime2);

        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 60000);

    loadBusStopData();

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bus #10 Arrival Time:</Text>
      <Text style={styles.timeText}>
        {loading ? <ActivityIndicator size="large" /> : arrival}
      </Text>
      <Text style={styles.timeText2}>
        {loading ? <ActivityIndicator size="large" /> : duration}
      </Text>
      <Text style={styles.headerText}>Next Bus Arrival Time:</Text>
      <Text style={styles.timeText}>
        {loading ? <ActivityIndicator size="large" /> : arrivalNext}
      </Text>
      <TouchableOpacity onPress={loadBusStopData} style={styles.button}>
        <Text styles={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  timeText: {
    marginBottom: 10,
    alignContent: "center",
    fontSize: 48,
    color: "#333333",
  },
  timeText2: {
    marginBottom: 20,
    alignContent: "center",
    fontSize: 20,
    color: "#333333",
  },
  button: {
    marginBottom: 20,
    borderRadius: 6,
    backgroundColor: "#f4f421",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    padding: 20,
  },
});
