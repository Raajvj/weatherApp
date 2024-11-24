import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchForecast, fetchWeatherHistory } from '../models/weatherModel';

export const getCurrentWeather = createAsyncThunk('weather/getCurrentWeather', async () => {
  return await fetchCurrentWeather();
});

export const getWeatherForecast = createAsyncThunk('weather/getWeatherForecast', async () => {
  return await fetchForecast();
});

export const getWeatherHistory = createAsyncThunk('weather/getWeatherHistory', async () => {
  return await fetchWeatherHistory();
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    forecast: null,
    weatherHistory: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.current_weather;
      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getWeatherForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload.daily_forecast;
      })
      .addCase(getWeatherForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getWeatherHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeatherHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherHistory = action.payload.historical_weather; 
      })
      .addCase(getWeatherHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
