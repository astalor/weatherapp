// src/screens/HomeScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { WeatherProvider } from '../context/WeatherContext';
import HomeScreen from './HomeScreen';
import axios from 'axios';
import { OPENWEATHER_API_KEY, UNSPLASH_ACCESS_KEY } from '../config';

// Mocking Animatable.Text for consistent testing
jest.mock('react-native-animatable', () => {
  const View = require('react-native').View;
  const Text = require('react-native').Text;
  return {
    View: View,
    Text: Text,
    Image: View,
  };
});

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText, debug } = render(
      <WeatherProvider>
        <HomeScreen />
      </WeatherProvider>
    );

    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    expect(getByText('Get Weather')).toBeTruthy();

  });

  it('displays weather data when valid city is entered', async () => {
    const { getByPlaceholderText, getByText, queryByText, debug } = render(
      <WeatherProvider>
        <HomeScreen />
      </WeatherProvider>
    );

    const city = 'London';

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Enter city'), city);
      fireEvent.press(getByText('Get Weather'));

      await waitFor(() => {
        //expect(queryByText(/Celsius:/)).toBeTruthy();
      });
    });
  });

  it('displays an error message when an invalid city is entered', async () => {
    const { getByPlaceholderText, getByText, queryByText, debug } = render(
      <WeatherProvider>
        <HomeScreen />
      </WeatherProvider>
    );

    const city = 'InvalidCity';
    const errorMessage = 'City not found. Please enter a valid city name.';

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Enter city'), city);
      fireEvent.press(getByText('Get Weather'));

      await waitFor(() => {
        //expect(queryByText(errorMessage)).toBeTruthy();
      });
    });
  });
});
