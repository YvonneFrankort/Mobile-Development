import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [years, setYears] = useState<string>('')
  const yearsAsNumber: number = !isNaN(Number(years)) == true ? Number(years) : 0
  const heartRateLower: number = (220 - yearsAsNumber) * 0.65
  const heartRateUpper: number = (220 - yearsAsNumber) * 0.85

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Heart Rate Limits Calculator</Text>
      <TextInput
        placeholder= "Enter your age in years"
        keyboardType= "number-pad"
        value={years}
        onChangeText={setYears}
        style={styles.input}
      />
      <Text style={styles.text}>Lower Limit: {heartRateLower.toFixed(2)} bpm</Text>
      <Text style={styles.text}>Upper Limit: {heartRateUpper.toFixed(2)} bpm</Text>
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
  heading: {
    fontSize: 24,
    marginTop: 32,
    marginBottom: 16
  },
  text: {
    marginVertical: 6
  },
  input: {
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    width: 200,
    marginBottom: 12,
  }
});
