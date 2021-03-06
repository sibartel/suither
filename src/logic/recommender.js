import { wrap } from 'comlink'

import weather from './weather-api.js'
import { cloth_sets } from './cloth-sets.js'

const PRECIPITATION_THRESHOLD = 0.3

let instance = null

export default class Recommender {
  constructor(cloth_sets) {
    this.cloth_sets = cloth_sets
    this.user_model = null
  }

  static get_categories() {
    return [...new Set(cloth_sets.map(cs => cs.category).flat())]
  }

  static async get() {
    if (!instance) {
      if (typeof(Worker) === 'undefined')
        throw new Error('Web worker not supported in current renderer.')

      let new_instance = new Recommender(cloth_sets)
      await new_instance.init()
      instance = new_instance
    }
    return instance
  }

  async init() {
    const UserModel = wrap(new Worker(new URL('worker.js', import.meta.url)))

    let user_model = {}

    if (typeof localStorage !== 'undefined' && localStorage.getItem('user_model'))
      user_model = JSON.parse(localStorage.getItem('user_model'))

    this.user_model = await new UserModel(user_model)
  }

  async model_status() {
    return await this.user_model.status()
  }

  async reset_model(sensation_deviation) {
    await this.user_model.reset(sensation_deviation)
    await this.save_model()
  }

  async save_model() {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem('user_model', await this.user_model.stringify())
  }

  async recommend(relevant_hours = 8, activity = 60, category = null, ignore_rain = false) {
    let forecast = (await weather.get_weather_forecast()).slice(0, relevant_hours)

    return (await Promise.all(this.cloth_sets.filter(cs => !category || cs.category.includes(category)).map(async cs => {
      let {variants, ...base_variant} = cs
      base_variant.description = 'base'
      let cloth_variants = [base_variant, ...variants ?? []]

      let forecast_sensation = await Promise.all(forecast.map(async hour => {
        return (await Promise.all(cloth_variants.map(async cv => ({
          predicted_thermal_sensation: await this.user_model.predict(hour.feels_like, cv.insulation, activity),
          precipitation_suitable: hour.pop < PRECIPITATION_THRESHOLD || cv.waterproof,
          ...cv,
          ...hour
        })))).reduce((p, c) => {
          if (!ignore_rain) {
            if (c.precipitation_suitable && !p.precipitation_suitable)
              return  c
            else if(p.precipitation_suitable && !c.precipitation_suitable)
              return p
          }
          return Math.abs(p.predicted_thermal_sensation) < Math.abs(c.predicted_thermal_sensation) ? p : c
        })
      }))

      return {
        predicted_thermal_sensation: {
          hourly: forecast_sensation,
          max: Math.max(...forecast_sensation.map(data => data.predicted_thermal_sensation)),
          min: Math.min(...forecast_sensation.map(data => data.predicted_thermal_sensation)),
          mean: forecast_sensation.map(data => data.predicted_thermal_sensation)
            .reduce((acc, ts) => acc + ts, 0) / relevant_hours,
          mse: forecast_sensation.map(data => data.predicted_thermal_sensation)
          .reduce((acc, ts) => acc + Math.pow(ts, 2), 0) / relevant_hours,
        },
        precipitation_suitable: forecast_sensation.every(hour => hour.precipitation_suitable),
        ...cs
      }
    }))).filter(cs => ignore_rain || cs.precipitation_suitable).sort((a, b) =>
      (Math.abs(a.predicted_thermal_sensation.mse) > Math.abs(b.predicted_thermal_sensation.mse)) ? 1 : -1
    )
  }

  async feedback(feels_like_temperature, cloth_insulation, activity, thermal_sensation) {
    await this.user_model.feedback(feels_like_temperature, cloth_insulation, activity, thermal_sensation)

    await this.save_model()
  }

  async live_feedback(cloth_insulation, activity, thermal_sensation) {
    let current_temperature = (await weather.get_weather_current()).feels_like
    await this.user_model.feedback(current_temperature, cloth_insulation, activity, thermal_sensation)

    await this.save_model()
  }
}