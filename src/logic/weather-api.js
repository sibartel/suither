import axios from 'axios'

const API_SECRET = process.env.OPENWEATHERMAP_API_TOKEN

const DEFAULT_COORDS = {
  latitude: 49.56,
  longitude: 11.34,
}

const CACHE_DURATION = 5 * 60 * 1000

let _cache = {
  ts: 0,
  data: undefined
}

function _get_geolocation() {
  return new Promise((resolve, reject) => {
    if (typeof(navigator) === 'undefined')
      throw new Error('Navigator api not available.')
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

async function _cached_weather(position = undefined) {
  if ((Date.now() - _cache.ts) > CACHE_DURATION) {
    position = position ?? DEFAULT_COORDS
    try {
      const geolocation = await _get_geolocation()
      position = {
        latitude: geolocation.coords.latitude,
        longitude: geolocation.coords.longitude,
      }
    } catch (error) {
      console.log(`Could not get user position, falling back to default coords of Bayreuth: ${error}`)
    }

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${API_SECRET}`)
    _cache = {
      ts: Date.now(),
      data: response.data
    }
  }

  return _cache.data
}

async function get_weather_forecast(position) {
  try {
    const data = await _cached_weather(position)
    return data.hourly
  } catch (error) {
    console.error(error)
  }
}

async function get_weather_today(position) {
  try {
    const data = await _cached_weather(position)
    return data.daily[0]
  } catch (error) {
    console.error(error)
  }
}

async function get_weather_current(position) {
  try {
    const data = await _cached_weather(position)
    return data.current
  } catch (error) {
    console.error(error)
  }
}

export default {get_weather_forecast, get_weather_today, get_weather_current}