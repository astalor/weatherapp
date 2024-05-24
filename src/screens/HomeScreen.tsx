import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useWeather } from '../context/WeatherContext';
import WeatherDisplay from '../components/WeatherDisplay';
import * as Animatable from 'react-native-animatable';
import { fetchWeather } from '../services/weatherService';
import { fetchBackgroundImage } from '../services/imageService';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const { state, dispatch } = useWeather();

  const handleGetWeather = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const weatherResult = await fetchWeather(city);
    if (weatherResult.success) {
      dispatch({ type: 'SET_WEATHER_DATA', payload: weatherResult.data });
      const imageResult = await fetchBackgroundImage(city);
      if (imageResult.success) {
        dispatch({ type: 'SET_BACKGROUND_IMAGE', payload: imageResult.url });
      } else {
        dispatch({ type: 'SET_BACKGROUND_IMAGE', payload: '' });
      }
    } else {
      dispatch({ type: 'SET_ERROR', payload: weatherResult.message });
      dispatch({ type: 'RESET_WEATHER_DATA' });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <View style={styles.buttonContainer}>
        <Button title="Get Weather" onPress={handleGetWeather} color="#6200ee" />
      </View>
      {state.loading ? (
        <Animatable.View animation="rotate" iterationCount={2} duration={2000}>
          <ActivityIndicator size="large" color="#6200ee" />
        </Animatable.View>
      ) : (
        <>
          {state.backgroundImage ? (
            <Animatable.Image
              animation="fadeIn"
              duration={1500}
              source={{ uri: state.backgroundImage }}
              style={styles.image}
            />
          ) : null}
          <WeatherDisplay />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#6200ee',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default HomeScreen;
