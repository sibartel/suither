import Recommender from "./recommender.mjs"
import weather from "./weather-api.mjs"

Recommender.get().then(async r => {
  await r.reset_model(0)
  console.log(await r.recommend(4, 60))
  await r.feedback(25, 0.6, 60, 0.1)
})

// Get current weather
weather.get_weather_current().then(forecast => console.log(forecast))

// Forecast for today includes .rain (Precipitation volume in mm) and .pop (Probability of precipitation)
weather.get_weather_today().then(forecast => console.log(forecast))