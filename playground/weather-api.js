const axios = require('axios').default;

const API_SECRET = '0c2090b7d93cf61728d4b223dc04a202'

async function get_weather(lat = 49.56, lon = 11.34) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&units=metric&appid=${API_SECRET}`);
    console.log(response.data.hourly);
  } catch (error) {
    console.error(error);
  }
}

get_weather().then(()=>console.log('finished'))