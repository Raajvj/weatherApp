export const fetchCurrentWeather = async () => {
  try {
    const response = await fetch('https://apps.org.in/weather/live/');
    if (!response.ok) {
      throw new Error('Failed to fetch current weather data');
    }
    const data = await response.json();
    console.log("live data :", data)
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch current weather data');
  }
};

export const fetchForecast = async () => {
  try {
    const response = await fetch('https://apps.org.in/weather/forecast/');
    if (!response.ok) {
      throw new Error('Failed to fetch weather forecast');
    }
    const data = await response.json();
    // console.log("forecasty data :", data)
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather forecast');
  }
};

export const fetchWeatherHistory = async () => {
  try {
    const response = await fetch('https://apps.org.in/weather/history/');
    if (!response.ok) {
      throw new Error('Failed to fetch weather history');
    }
    const data = await response.json();
    // console.log("weather history data :", data)
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather history');
  }
};
