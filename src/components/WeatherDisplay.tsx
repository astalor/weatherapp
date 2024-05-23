// src/components/WeatherDisplay.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useWeather } from '../context/WeatherContext';

const WeatherDisplay = () => {
  const { state } = useWeather();

  if (state.error) {
    return (
      <Animatable.View animation="shake" style={styles.container}>
        <Text style={styles.error}>{state.error}</Text>
      </Animatable.View>
    );
  }

  if (!state.temperature.celsius) {
    return (
      <Animatable.View animation="fadeIn" style={styles.container}>
        <Text style={styles.noDataText}></Text>
      </Animatable.View>
    );
  }

  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      {state.temperature.celsius !== null ? (
        <>
          <View style={styles.iconContainer}>
            <Image source={{ uri: `http://openweathermap.org/img/wn/${state.weatherIcon}@2x.png` }} style={styles.icon} />
          </View>
          <Animatable.View animation="fadeInUp" delay={300} style={styles.textContainer}>
            <Text style={styles.label}>Celsius:</Text>
            <Text style={styles.value}>{state.temperature.celsius.toFixed(2)}°C</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={600} style={styles.textContainer}>
            <Text style={styles.label}>Fahrenheit:</Text>
            <Text style={styles.value}>{state.temperature.fahrenheit?.toFixed(2)}°F</Text>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={900} style={styles.textContainer}>
            <Text style={styles.label}>Kelvin:</Text>
            <Text style={styles.value}>{state.temperature.kelvin?.toFixed(2)}K</Text>
          </Animatable.View>
        </>
      ) : (
        <Animatable.Text animation="fadeIn" style={styles.noDataText}>No Data</Animatable.Text>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#007AFF',
  },
  noDataText: {
    fontSize: 18,
    color: '#333',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default WeatherDisplay;
