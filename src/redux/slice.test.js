import reducer, { getCurrentWeather, getWeatherForecast } from '../redux/slice';
import { configureStore } from '@reduxjs/toolkit';
import * as weatherModel from '../models/weatherModel';

jest.mock('../models/weatherModel');

describe('Weather Redux Slice', () => {
  it('should handle loading state while fetching weather data', async () => {
    const store = configureStore({ reducer: { weather: reducer } });
    weatherModel.fetchCurrentWeather.mockResolvedValue({ temperature: 25 });

    await store.dispatch(getCurrentWeather('New York'));

    const state = store.getState().weather;
    expect(state.currentWeather.temperature).toBe(25);
    expect(state.loading).toBe(false);
  });

  it('should handle error state when API fails', async () => {
    const store = configureStore({ reducer: { weather: reducer } });
    weatherModel.fetchCurrentWeather.mockRejectedValue(new Error('API Error'));

    await store.dispatch(getCurrentWeather('New York'));

    const state = store.getState().weather;
    expect(state.error).toBe('API Error');
    expect(state.loading).toBe(false);
  });
});
