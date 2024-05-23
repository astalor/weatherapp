// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useWeather } from '../context/WeatherContext';
import { OPENWEATHER_API_KEY, UNSPLASH_ACCESS_KEY } from '../config';
import WeatherDisplay from '../components/WeatherDisplay';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const { state, dispatch } = useWeather();

  const fetchWeather = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: '' });
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`
      );
      const data = response.data;
      if (data.cod !== 200) {
        let errorMessage = 'An error occurred while fetching the weather data.';
        if (data.cod === '404') {
          errorMessage = 'City not found. Please enter a valid city name.';
        }
        if (data.cod === '400') {
            errorMessage = 'Please enter a city name.';
          }
        throw new Error(errorMessage);
      }

      dispatch({ type: 'SET_WEATHER_DATA', payload: data });
      await fetchBackgroundImage(city);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'City not found. Please enter a valid city name' });
      dispatch({ type: 'RESET_WEATHER_DATA' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchBackgroundImage = async (city: string) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: city,
          client_id: UNSPLASH_ACCESS_KEY,
          orientation: 'landscape',
        },
      });

      const imageUrl = response.data.results[0]?.urls?.regular;
      if (imageUrl) {
        dispatch({ type: 'SET_BACKGROUND_IMAGE', payload: imageUrl });
      } else {
        dispatch({ type: 'SET_BACKGROUND_IMAGE', payload: '' });
      }
    } catch (error) {
      dispatch({ type: 'SET_BACKGROUND_IMAGE', payload: '' });
    }
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
        <Button title="Get Weather" onPress={fetchWeather} color="#6200ee" />
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
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
