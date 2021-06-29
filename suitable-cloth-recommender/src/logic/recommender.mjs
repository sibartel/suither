import { wrap } from 'comlink'

import weather from './weather-api.mjs'
import {cloth_sets} from './cloth_sets.mjs'

let instance = null

export default class Recommender {
  constructor(cloth_sets) {
    this.cloth_sets = cloth_sets
    this.user_model = null
  }

  static async get() {
    if (!instance) {
      instance = new Recommender(cloth_sets)
      await instance.init()
    }
    return instance
  }

  async init() {
    const UserModel = wrap(new Worker(new URL('worker.mjs', import.meta.url)))

    let user_model = {}

    if(typeof localStorage !== 'undefined' && localStorage.getItem('user_model'))
      user_model = JSON.parse(localStorage.getItem('user_model'))

    this.user_model = await new UserModel(user_model)
  }

  async reset_model(sensation_deviation) {
    await this.user_model.reset(sensation_deviation)
  }

  async save_model() {
    if(typeof localStorage !== 'undefined')
      localStorage.setItem('user_model', await this.user_model.stringify())
  }

  async recommend(relevant_hours = 8, activity = 60) {
    let forecast = (await weather.get_weather_forecast()).slice(0, relevant_hours)

    return (await Promise.all(this.cloth_sets.map(async cs => {
      let {variants, ...base_variant} = cs
      let cloth_variants = [base_variant, ...variants ?? []]

      let forecast_sensation = await Promise.all(forecast.map(async hour => {
        return (await Promise.all(cloth_variants.map(async cv => ({
          predicted_thermal_sensation: await this.user_model.predict(hour.feels_like, cv.insulation, activity),
          ...cv
        })))).reduce((p, c) =>
          Math.abs(p.predicted_thermal_sensation) < Math.abs(c.predicted_thermal_sensation) ? p : c
        )
      }))

      return {
        predicted_thermal_sensation: {
          hourly: forecast_sensation,
          max: Math.max(...forecast_sensation.map(data => data.predicted_thermal_sensation)),
          min: Math.min(...forecast_sensation.map(data => data.predicted_thermal_sensation)),
          mean: forecast_sensation.map(data => data.predicted_thermal_sensation)
            .reduce((acc, ts) => acc + ts, 0) / relevant_hours
        },
        ...cs
      }
    }))).sort((a, b) =>
      (Math.abs(a.predicted_thermal_sensation.mean) > Math.abs(b.predicted_thermal_sensation.mean)) ? 1 : -1
    )
  }

  async feedback(feels_like_temperature, cloth_insulation, activity, thermal_sensation) {
    await this.user_model.feedback(feels_like_temperature, cloth_insulation, activity, thermal_sensation)

    await this.save_model()
  }

  async live_feedback(cloth_insulation, activity, thermal_sensation) {
    let current_temperature = await weather.get_weather_current().feels_like
    await this.user_model.feedback(current_temperature, cloth_insulation, activity, thermal_sensation)

    await this.save_model()
  }
}