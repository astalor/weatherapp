import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { WeatherProvider } from '../context/WeatherContext';
import HomeScreen from './HomeScreen';
import axios from 'axios';

jest.mock('react-native-animatable', () => {
  const View = require('react-native').View;
  const Text = require('react-native').Text;
  return {
    View: View,
    Text: Text,
    Image: View,
  };
});

jest.mock('axios');

// Mock data and responses
const mockWeatherSuccessResponse = {
  status: 200,
  data: {
    cod: 200,
    main: {
      temp: 15,
    },
    weather: [
      {
        description: 'clear sky',
        icon: '01d',
      },
    ],
    name: 'London',
  },
};

const mockWeatherErrorResponse = {
  response: {
    status: 404,
    data: {
      cod: '404',
      message: 'city not found',
    },
  },
};

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

  it('displays an error message when an invalid city is entered', async () => {
    axios.get.mockRejectedValueOnce(mockWeatherErrorResponse);

    const { getByPlaceholderText, getByText, queryByText, debug } = render(
      <WeatherProvider>
        <HomeScreen />
      </WeatherProvider>
    );

    const city = 'InvalidCity';
    const errorMessage = 'The city was not found. Please check the spelling or try another city.';

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Enter city'), city);
      fireEvent.press(getByText('Get Weather'));
    });


    await waitFor(() => {
      expect(queryByText(errorMessage)).toBeTruthy();
    }, { timeout: 1000 });
  });

  it('displays the temperature when a valid city is entered', async () => {
    const city = 'London';
    axios.get.mockResolvedValueOnce(mockWeatherSuccessResponse);

    const { getByPlaceholderText, getByText, queryByText, debug } = render(
      <WeatherProvider>
        <HomeScreen />
      </WeatherProvider>
    );


    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Enter city'), city);
      fireEvent.press(getByText('Get Weather'));
    });


    await waitFor(() => {
      expect(queryByText(/Celsius/)).toBeTruthy();
    }, { timeout: 3000 });
  });
});
