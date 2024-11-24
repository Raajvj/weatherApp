import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, useColorScheme, ImageBackground, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentWeather, getWeatherForecast, getWeatherHistory } from '../redux/slice';
import themeColors from '../theme/DarkModeColors';
import { Text, useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';




const CurrentWeatherScreen = () => {
  const colorScheme = useColorScheme();
  const customThemeColors = colorScheme === 'dark' ? themeColors.dark : themeColors.light;

  const dispatch = useDispatch();
  const { currentWeather, forecast, weatherHistory, loading, error } = useSelector((state) => state.weather);
  const [historyShow, setHistoryShow] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleToggler = () => {
    setHistoryShow(!historyShow);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };


  const formatTimestamp = (timestamp) => {
    const [datePart, timePart] = timestamp.split(' '); 
    const [year, month, day] = datePart.split('-'); 
    let [hours, minutes, seconds] = timePart.split(':'); 

    const period = +hours >= 12 ? 'PM' : 'AM';
    hours = +hours % 12 || 12; 
    minutes = minutes.padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
  };





  const convertFahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };


  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getCurrentWeather());
    dispatch(getWeatherForecast());
    dispatch(getWeatherHistory());
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(getCurrentWeather());
    dispatch(getWeatherForecast());
    dispatch(getWeatherHistory());
  }, [dispatch]);

  console.log("forecast :", forecast)
  console.log("weatherHistory :", weatherHistory)


  const renderForecastItem = ({ item, index }) => (

    <View style={[styles.weatherData, { backgroundColor: customThemeColors.itemCardbackGround }]}>
      <LottieView
        source={require('../assets/cloudLottie2.json')}
        style={styles.cloudImage2}
        autoPlay
        loop={true}
      />

      <View style={styles.TempRow}>
        <Text style={[{ color: customThemeColors.text }, { fontSize: hp(2) }]}>{convertFahrenheitToCelsius(item.min_temperature).toFixed(1)}°C</Text>
        <Text> / </Text>
        <Text style={[{ color: customThemeColors.text }, { fontSize: hp(2) }]}>{convertFahrenheitToCelsius(item.max_temperature).toFixed(1)}°C</Text>
      </View>

      <Text style={[styles.cardText1, { color: customThemeColors.text }]}>{formatDate(item.date)}</Text>
      <Text style={[styles.cardText1, { color: customThemeColors.text }]}>{item.weather_conditions}</Text>
    </View>
  );

  const renderHistoryItem = ({ item, index }) => (
    <View style={[styles.weatherData, { backgroundColor: customThemeColors.itemCardbackGround }]}>
      <LottieView
        source={require('../assets/cloudLottie1.json')}
        style={styles.cloudImageHistory}
        autoPlay
        loop={true}
      />

      <Text style={[{ color: customThemeColors.text }, { fontSize: hp(1.9) }]}>{formatTimestamp(item.timestamp)}</Text>
      <Text style={[{ color: customThemeColors.text }, { fontSize: hp(1.7), marginTop: hp(0.5) }]}>Temperature : {convertFahrenheitToCelsius(item.temperature).toFixed(1)}°C</Text>
      <Text style={[{ color: customThemeColors.text }, { fontSize: hp(1.7), marginTop: hp(0.2) }]}>Humidity : {item.humidity}°C</Text>
      <Text style={[{ color: customThemeColors.text }, { fontSize: hp(1.7), marginTop: hp(0.2) }]}>Wind Speed : {item.wind_speed} kmph</Text>
      <Text style={[{ color: customThemeColors.text }, { fontSize: hp(1.7), marginTop: hp(0.2) }]}>Pressure : {item.pressure}</Text>
      <Text style={[{ color: customThemeColors.text }, { fontSize: hp(1.7), marginTop: hp(0.2) }]}>Visibility : {item.visibility}</Text>
      <Text style={[{ color: customThemeColors.text }, { fontSize: hp(1.7), marginTop: hp(0.2) }]}>{item.weather_conditions}</Text>
    </View>
  );



  return (
    <View style={[styles.container, { backgroundColor: customThemeColors.background }]}>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}

      {currentWeather && (
        <ImageBackground style={styles.backgroundImage} source={require('../assets/weatherBG.jpg')}
          imageStyle={{ borderRadius: hp(2) }}>

          <View style={styles.cloudImageTopContainer}>
            <LottieView
              source={require('../assets/cloudLottie.json')}
              style={styles.cloudImageTop}
              autoPlay
              loop={true}
            />
          </View>


          <View style={styles.weatherDataBtmLeft}>
            <View style={styles.weatherDataTopLeft}
            >
              <Text style={[styles.topText, { color: customThemeColors.text }]}>Now</Text>
              <Text style={[styles.topTextTemp, { color: customThemeColors.text }]}>{convertFahrenheitToCelsius(currentWeather?.temperature)}°</Text>
              <Text style={[styles.topText, { color: customThemeColors.text }]}>{currentWeather.weather_conditions}</Text>
            </View>



            <View style={styles.weatherDataTopRight}>
              <Text style={[styles.topText, { color: customThemeColors.text }]}>Humidity : {currentWeather.humidity}%</Text>
              <Text style={[styles.topText, { color: customThemeColors.text }]}>Wind Speed : {currentWeather.wind_speed} km/h</Text>
              <Text style={[styles.topText, { color: customThemeColors.text }]}>Pressure : {currentWeather.pressure} hPa</Text>
              <Text style={[styles.topText, { color: customThemeColors.text }]}>Visibility : {currentWeather.visibility} km</Text>
            </View>
          </View>
        </ImageBackground>
      )}


      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={['#2C3E50', '#FD746C', '#baff8c']}
          style={styles.gradientBorder}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity onPress={handleToggler} style={[styles.button, { backgroundColor: customThemeColors.background, color: customThemeColors.Text }]}>
            <Text style={[styles.buttonText, { color: customThemeColors.Text }]}>{historyShow ? "Show Forecast" : 'Show History'}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>




      <FlatList
        data={historyShow ? weatherHistory : forecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={historyShow ? renderHistoryItem : renderForecastItem}
        horizontal={true}
        onRefresh={onRefresh}
        refreshing={refreshing} 
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  gradientBorder: {
    padding: hp(0.3),
    borderRadius: hp(1.5),
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: hp(1),
    elevation: 5,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
  },
  forecastItem: {
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    marginHorizontal: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: 200,
  },
  weatherData: {
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  backgroundImage: {
    width: wp(90),
    padding: 20,
    marginBottom: hp(2),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weatherDataBtmLeft: {
    width: wp(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  weatherDataTopLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  weatherDataTopRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'center',
    justifyContent: 'space-evenly'
  },
  topText: {
    fontSize: hp(1.7),
    fontWeight: '700',
  },
  topTextTemp: {
    fontSize: hp(5),
    fontWeight: '700',
  },
  TempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: wp(30),
  },
  cloudImageHistory: {
    width: hp(10),
    height: hp(10),
    marginBottom: hp(1),
    alignSelf: 'center'
  },
  cloudImage: {
    width: hp(15),
    height: hp(15),
    marginBottom: hp(-6),
    alignSelf: 'center'
  },
  cloudImage2: {
    width: hp(16),
    height: hp(16),
    marginBottom: hp(-2),
    alignSelf: 'center'
  },
  cloudImageTopContainer: {
    alignItems: 'center',
    width: wp(80)
  },
  cloudImageTop: {
    width: hp(30),
    height: hp(30),
    marginBottom: hp(-10),
    marginLeft: hp(-10),
    marginRight: hp(-10),
    alignSelf: 'center',
  },
  cardText1: {
    width: wp(30),
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default CurrentWeatherScreen;
