// src/context/WeatherContext.test.tsx
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { WeatherProvider, useWeather } from './WeatherContext';
import { OPENWEATHER_API_KEY, UNSPLASH_ACCESS_KEY } from '../config';

const mockAxios = new MockAdapter(axios);

describe('WeatherContext', () => {
  const wrapper = ({ children }) => <WeatherProvider>{children}</WeatherProvider>;

  it('fetches and sets weather data correctly', async () => {
    const { result } = renderHook(() => useWeather(), { wrapper });

    const city = 'London';
    const weatherData = {
      main: { temp: 293.15 },
      weather: [{ icon: '01d' }],
    };
    const imageUrl = 'https://example.com/image.jpg';

    mockAxios.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`).reply(200, weatherData);
    mockAxios.onGet('https://api.unsplash.com/search/photos').reply(200, { results: [{ urls: { regular: imageUrl } }] });

    await act(async () => {
      result.current.dispatch({ type: 'SET_LOADING', payload: true });
      result.current.dispatch({ type: 'SET_ERROR', payload: '' });

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`);
        const data = response.data;

        result.current.dispatch({ type: 'SET_WEATHER_DATA', payload: data });

        const imageResponse = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: city, client_id: UNSPLASH_ACCESS_KEY, orientation: 'landscape' },
        });

        const imageUrl = imageResponse.data.results[0]?.urls?.regular;
        result.current.dispatch({ type: 'SET_BACKGROUND_IMAGE', payload: imageUrl });
      } catch (error) {
        result.current.dispatch({ type: 'SET_ERROR', payload: error.message });
      } finally {
        result.current.dispatch({ type: 'SET_LOADING', payload: false });
      }
    });

    expect(result.current.state.temperature.celsius).not.toBeNull();
    expect(result.current.state.temperature.celsius).toBeCloseTo(20, 0.1); // Ensure proper value comparison
    expect(result.current.state.weatherIcon).toBe('01d');
    expect(result.current.state.backgroundImage).toBe(imageUrl);
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.error).toBe('');
  });

  it('handles errors correctly when fetching weather data', async () => {
    const { result } = renderHook(() => useWeather(), { wrapper });

    const city = 'InvalidCity';
    const errorMessage = 'City not found. Please enter a valid city name.';

    mockAxios.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`).reply(404, { cod: '404', message: 'city not found' });

    await act(async () => {
      result.current.dispatch({ type: 'SET_LOADING', payload: true });
      result.current.dispatch({ type: 'SET_ERROR', payload: '' });

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`);
        const data = response.data;

        result.current.dispatch({ type: 'SET_WEATHER_DATA', payload: data });
      } catch (error) {
        result.current.dispatch({ type: 'SET_ERROR', payload: 'City not found. Please enter a valid city name.' });
      } finally {
        result.current.dispatch({ type: 'SET_LOADING', payload: false });
      }
    });

    expect(result.current.state.error).toBe(errorMessage);
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.temperature.celsius).toBeNull();
  });
});
