import weather from './weather-api.mjs'
import UserModel from "./user-model.mjs"

// TODO: Support cloth variants, use hourly best suiting cloth configuration

class Recommender {
  constructor(cloth_sets) {
    this.cloth_sets = cloth_sets

    let user_model = {}

    if(typeof localStorage !== 'undefined')
      user_model = JSON.parse(localStorage.getItem('user_model'))

    this.user_model = new UserModel(user_model)
  }

  reset_model(sensation_deviation) {
    this.user_model.reset(sensation_deviation)
  }

  save_model() {
    if(typeof localStorage !== 'undefined')
      localStorage.setItem('user_model', JSON.stringify(this.user_model))
  }

  async recommend(relevant_hours = 8, activity = 60) {
    let forecast = (await weather.get_weather_forecast()).slice(0, relevant_hours)

    return this.cloth_sets.map(cs => {
      let forecast_sensation = forecast.map(hour =>
        this.user_model.predict(hour.feels_like, cs.insulation, activity)
      )

      console.log(forecast_sensation)

      return {
        predicted_thermal_sensation: {
          hourly: forecast_sensation,
          max: Math.max(...forecast_sensation),
          min: Math.min(...forecast_sensation),
          mean: forecast_sensation.reduce((acc, ts) => acc + ts, 0) / relevant_hours
        },
        ...cs
      }
    }).sort((a, b) =>
      (Math.abs(a.predicted_thermal_sensation.mean) > Math.abs(b.predicted_thermal_sensation.mean)) ? 1 : -1
    )
  }

  async live_feedback(cloth_insulation, activity, thermal_sensation) {
    let current_temperature = await weather.get_weather_current().feels_like
    this.user_model.feedback(current_temperature, cloth_insulation, activity, thermal_sensation)

    this.save_model()
  }
}

export default Recommender