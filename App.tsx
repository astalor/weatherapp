// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { WeatherProvider } from './src/context/WeatherContext';
import { View, StyleSheet } from 'react-native';

const AppContent = () => {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
};

const App = () => (
  <WeatherProvider>
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  </WeatherProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
