import axios from 'axios'

const API_SECRET = '0c2090b7d93cf61728d4b223dc04a202'

const DEFAULT_LAT = 49.56
const DEFAULT_LON = 11.34

async function get_weather_forecast(lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=${API_SECRET}`)
    return response.data.hourly
  } catch (error) {
    console.error(error);
  }
}

async function get_weather_current(lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,daily&units=metric&appid=${API_SECRET}`)
    return response.data.current
  } catch (error) {
    console.error(error);
  }
}

export default {get_weather_forecast, get_weather_current}