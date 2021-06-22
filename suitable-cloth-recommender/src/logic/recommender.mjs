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
    let forecast = await weather.get_weather_forecast()
    let feels_like_temperature = (forecast.slice(0, relevant_hours).reduce((acc, hour) => acc + hour.feels_like, 0) / relevant_hours) || 0
    console.log(feels_like_temperature)

    // TODO: Iterate trough each relevant hour and evaluate thermal_sensation (max, min, average), average afterwards

    return this.cloth_sets.map(cl => ({
      predicted_thermal_sensation: this.user_model.predict(feels_like_temperature, cl.insulation, activity),
      ...cl
    })).sort((a, b) => (Math.abs(a.predicted_thermal_sensation) > Math.abs(b.predicted_thermal_sensation)) ? 1 : -1)
  }

  async live_feedback(cloth_insulation, activity, thermal_sensation) {
    let current_temperature = await weather.get_weather_current().feels_like
    this.user_model.feedback(current_temperature, cloth_insulation, activity, thermal_sensation)

    this.save_model()
  }
}

export default Recommender