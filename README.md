
# WeatherApp

WeatherApp is a React Native application that displays the current temperature for a user-selected city in Celsius, Fahrenheit, and Kelvin.

[![Watch the video](https://img.youtube.com/vi/Yl42ItQ8GIo)/maxresdefault.jpg)](https://youtu.be/Yl42ItQ8GIo)

## Features

- Search input where users can type the name of a city.
- Display the current temperature in Celsius, Fahrenheit, and Kelvin.
- Fetch real-time weather information using the OpenWeather API.
- Display error messages if the city is not found or if there is an issue with fetching data.
- Loading state while fetching weather data.
- Enhanced UI with animations and transitions.
- Integration tests are in HomeScreen.test.tsx
- Unit tests are in WeatherContext.test.tsx

## Prerequisites

Before you begin, ensure you have met the following requirements:

- A Windows machine with internet access

## Installation

### Step 1: Install Node.js and npm

1. Download Node.js from [Node.js official website](https://nodejs.org/). Choose the LTS version.
2. Run the installer and follow the setup wizard.
3. Verify the installation by opening Command Prompt and running:
   ```sh
   node -v
   npm -v
   ```

### Step 2: Install Git

1. Download Git from [Git official website](https://git-scm.com/).
2. Run the installer and follow the setup wizard.
3. Verify the installation by opening Command Prompt and running:
   ```sh
   git --version
   ```

### Step 3: Install Expo CLI

1. Open Command Prompt and run the following command to install Expo CLI globally:
   ```sh
   npx install-expo-modules@latest
   ```

### Step 4: Clone the Repository

1. Open Command Prompt and navigate to the directory where you want to clone the repository:
   ```sh
   cd path\to\your\directory
   ```
2. Clone the repository:
   ```sh
   git clone https://github.com/astalor/weatherapp.git
   ```
3. Navigate to the project directory:
   ```sh
   cd weatherapp
   ```

### Step 5: Install Project Dependencies

1. Install the project dependencies by running:
   ```sh
   npm install
   ```

### Step 6: Set Up Environment Variables

1. Copy the file src/config.ts.example into src/config.ts
2. Add your OpenWeather API key and Unsplash Access key to the `config.ts` file:
   ```env
   export const OPENWEATHER_API_KEY = '';
   export const UNSPLASH_ACCESS_KEY = '';
   ```

### Step 7: Start the Project

1. Start the Expo development server by running:
   ```sh
   npx expo start
   ```
2. Follow the instructions in the terminal to open the app on an Android or iOS emulator, or on your physical device using the Expo Go app.

### Step 8: Android emulator

1. Make sure that you have installed Android Studio with a working emulator

## Running Tests

1. To run the tests, use the following command:
   ```sh
   npm test
   ```

## Additional Information

- For detailed instructions on using Expo CLI, visit the [Expo Documentation](https://docs.expo.dev/).
- For more information on React Native, visit the [React Native Documentation](https://reactnative.dev/).


