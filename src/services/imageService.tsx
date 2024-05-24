import axios from 'axios';
import { UNSPLASH_ACCESS_KEY } from '../config';

export const fetchBackgroundImage = async (city: string) => {
  if (!city.trim()) {
    return { success: false, message: "Please enter a city to find related images." };
  }

  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: city,
        client_id: UNSPLASH_ACCESS_KEY,
        orientation: 'landscape',
      },
    });
    const imageUrl = response.data.results[0]?.urls?.regular;
    if (!imageUrl) {
      return { success: false, message: "No images found for the specified city." };
    }
    return { success: true, url: imageUrl };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return { success: false, message: "Failed to retrieve images due to server error. Please try again later." };
    } else if (error.request) {
      // The request was made but no response was received
      return { success: false, message: "No response from the image server. Please check your network connection." };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { success: false, message: `Error setting up the image request: ${error.message}` };
    }
  }
};
