import axios from 'axios'

const API_SECRET = '0c2090b7d93cf61728d4b223dc04a202'

const DEFAULT_LAT = 49.56
const DEFAULT_LON = 11.34

const CACHE_DURATION = 5 * 60 * 1000

let _cache = {
  ts: 0,
  data: undefined
}

async function _cached_weather(lat, lon) {
  if ((Date.now() - _cache.ts) > CACHE_DURATION) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_SECRET}`)
    _cache = {
      ts: Date.now(),
      data: response.data
    }
  }

  return _cache.data
}

async function get_weather_forecast(lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  try {
    const data = await _cached_weather(lat, lon)
    return data.hourly
  } catch (error) {
    console.error(error)
  }
}

async function get_weather_current(lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  try {
    const data = await _cached_weather(lat, lon)
    return data.current
  } catch (error) {
    console.error(error)
  }
}

export default {get_weather_forecast, get_weather_current}