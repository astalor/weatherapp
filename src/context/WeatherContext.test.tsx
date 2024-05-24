import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { WeatherProvider, useWeather } from './WeatherContext';

describe('WeatherContext', () => {
  it('updates weather data correctly when dispatching SET_WEATHER_DATA', async () => {
    const wrapper = ({ children }) => <WeatherProvider>{children}</WeatherProvider>;
    const { result } = renderHook(() => useWeather(), { wrapper });

    const weatherData = {
      main: { temp: 298.15 }, // approximately 25°C, 77°F
      weather: [{ icon: '01d' }],
    };

    act(() => {
      result.current.dispatch({ type: 'SET_WEATHER_DATA', payload: weatherData });
    });

    expect(result.current.state.temperature.celsius).toBeCloseTo(25);
    expect(result.current.state.temperature.fahrenheit).toBeCloseTo(77);
    expect(result.current.state.temperature.kelvin).toBeCloseTo(298.15);
    expect(result.current.state.weatherIcon).toBe('01d');
    expect(result.current.state.loading).toBeFalsy();
    expect(result.current.state.error).toBe('');
  });

  it('handles errors correctly when dispatching SET_ERROR', async () => {
    const wrapper = ({ children }) => <WeatherProvider>{children}</WeatherProvider>;
    const { result } = renderHook(() => useWeather(), { wrapper });

    const errorMessage = 'Network error';

    act(() => {
      result.current.dispatch({ type: 'SET_ERROR', payload: errorMessage });
    });

    expect(result.current.state.error).toBe(errorMessage);
    expect(result.current.state.loading).toBeFalsy();
    expect(result.current.state.temperature.celsius).toBeNull();
    expect(result.current.state.weatherIcon).toBe('');
  });
});
