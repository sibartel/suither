import weather from './weather-api.mjs'
import UserModel from "./user-model.mjs"
import {cloth_sets} from "./cloth_sets.mjs"

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

// feels_like_temperature, cloth_insulation, activity, thermal_sensation
const test_model_data = [
  [0, 0.57, 60, -3],
  [5, 0.57, 60, -3],
  [10, 0.57, 60, -3],
  [15, 0.57, 60, -2],
  [20, 0.57, 60, 0],
  [25, 0.57, 60, 0],
  [30, 0.57, 60, 1],
  [35, 0.57, 60, 3],
  [20, 0.36, 60, -2],
  [20, 0.57, 60, -1],
  [20, 0.61, 60, 0],
  [20, 0.96, 60, 1],
  [20, 1.30, 60, 3],
  [20, 0.74, 60, 1],
  [20, 0.57, 60, -1],
  [20, 0.57, 120, 0],
  [20, 0.57, 48, -3],
  [20, 0.57, 180, 1],
]

// TODO: Support cloth variants, use hourly best suiting cloth configuration
// TODO: Split model_data in default and user data points
// TODO: Generate default model_data based on self assessment of users

// let r = new Recommender(cloth_sets, test_model_data)
// r.recommend(1, 60).then((r) => console.log(r))

export default Recommender