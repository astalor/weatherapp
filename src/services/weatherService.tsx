import axios from 'axios';
import { OPENWEATHER_API_KEY } from '../config';

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`
    );
    const data = response.data;
    if (data.cod !== 200) {
      return handleError(data.cod);
    }
    return { success: true, data: data };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return handleError(error.response.data.cod);
    } else if (error.request) {
      // The request was made but no response was received
      return { success: false, message: "No response from the server. Please check your network connection." };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { success: false, message: `Error setting up the request: ${error.message}` };
    }
  }
};

function handleError(code) {
  let message = "";
  switch (code) {
    case '404':
      message = "The city was not found. Please check the spelling or try another city.";
      break;
    case '400':
      message = "Please enter a city name and try again.";
      break;
    default:
      message += "Please try again later.";
      break;
  }
  return { success: false, message: message };
}
