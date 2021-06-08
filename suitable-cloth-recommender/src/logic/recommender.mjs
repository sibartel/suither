import weather from './weather-api.mjs'
import UserModel from "./user-model.mjs"

// TODO: Support cloth variants, use hourly best suiting cloth configuration
// TODO: Split model_data in default and user data points
// TODO: Generate default model_data based on self assessment of users

class Recommender {
  constructor(cloth_sets, model_data) {
    this.cloth_sets = cloth_sets
    this.user_model = new UserModel(model_data)
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
  }
}

export default Recommender