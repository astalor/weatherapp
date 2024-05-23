// src/context/WeatherContext.tsx
import React, { createContext, useReducer, ReactNode, useContext } from 'react';

// Define types for state and actions
interface State {
  temperature: {
    celsius: number | null;
    fahrenheit: number | null;
    kelvin: number | null;
  };
  weatherIcon: string;
  backgroundImage: string;
  loading: boolean;
  error: string;
}

type Action =
  | { type: 'SET_WEATHER_DATA'; payload: any }
  | { type: 'SET_BACKGROUND_IMAGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET_WEATHER_DATA' };

// Define the initial state
const initialState: State = {
  temperature: { celsius: null, fahrenheit: null, kelvin: null },
  weatherIcon: '',
  backgroundImage: '',
  loading: false,
  error: '',
};

// Create a reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_WEATHER_DATA':
      const celsius = action.payload.main.temp - 273.15;
      const fahrenheit = (celsius * 9) / 5 + 32;
      const kelvin = action.payload.main.temp;
      return {
        ...state,
        temperature: { celsius, fahrenheit, kelvin },
        weatherIcon: action.payload.weather[0].icon,
        error: '', // Reset error on successful data fetch
      };
    case 'SET_BACKGROUND_IMAGE':
      return { ...state, backgroundImage: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_WEATHER_DATA':
      return { ...initialState, error: state.error }; // Keep the current error state
    default:
      return state;
  }
};

// Create context
const WeatherContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create provider
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use the weather context
export const useWeather = () => useContext(WeatherContext);
