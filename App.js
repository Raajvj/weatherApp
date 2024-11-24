import React, { useMemo, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { useColorScheme} from 'react-native';
import store from './src/redux/store';
import CurrentWeatherScreen from './src/views/CurrentWeatherScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();

  const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
  };

  const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
  };

  const theme = useMemo(() => (
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
  ), [colorScheme]);




  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen name="Weather" component={CurrentWeatherScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
