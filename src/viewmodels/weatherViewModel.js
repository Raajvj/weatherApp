import { useEffect, useState, useCallback } from 'react';
import { fetchCurrentWeather, fetchForecast, fetchWeatherHistory } from '../models/weatherModel';

export const useWeatherViewModel = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const weather = await fetchCurrentWeather();
      const forecastData = await fetchForecast();
      const weatherHistoryData = await fetchWeatherHistory();

      setCurrentWeather(weather.current_weather);
      setForecast(forecastData.daily_forecast);
      setWeatherHistory(weatherHistoryData.historical_weather);

      console.log("weather (current):", weather);
      console.log("forecast (data):", forecastData);
      console.log("History (data):", weatherHistoryData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  return {
    currentWeather,
    forecast,
    weatherHistory,
    loading,
    error,
    getWeatherData,
  };
};
