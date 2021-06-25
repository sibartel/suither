import Regressor from "./regressor.mjs"
import {Matrix} from "ml-matrix"

// https://en.wikipedia.org/wiki/Thermal_comfort#Interplay_of_temperature_and_humidity
// https://en.wikipedia.org/wiki/Clothing_insulation

const DEFAULT_WEIGHTS = Matrix.columnVector([7.93, -1.95e-1, -4.6, -1.16e-2])

class UserModel {
  constructor(options) {
    const {prep_data = [], data = [], model = new Regressor({
      weights: DEFAULT_WEIGHTS
    })} = options
    this._prep_data = prep_data
    this._data = data
    this._model = model
  }

  toJSON(_) {
    return {
      prep_data: this._prep_data,
      data: this._data,
      model: this._model
    }
  }

  reset(sensation_deviation) {
    this._data = []
    this._model.weights = DEFAULT_WEIGHTS.add(Matrix.columnVector([sensation_deviation, 0, 0, 0]))

    this._prep_data = []
    for (let feels_like_temperature = -5; feels_like_temperature <= 40; feels_like_temperature += 15)
      for (let cloth_insulation = 0.2; cloth_insulation <= 1.5; cloth_insulation += 0.3)
        for (let activity = -40; activity <= 180; activity += 50) {
          let sensation = this.predict(feels_like_temperature, cloth_insulation, activity)
          this._prep_data.push([feels_like_temperature, cloth_insulation, activity, sensation])
        }
  }

  update() {
    let data = this._prep_data.concat(this._data)
    let x = data.map((set) => set.slice(0, -1))
    let y = data.map((set) => set.slice(-1))
    this._model.train(x, y)
  }

  feedback(feels_like_temperature, cloth_insulation, activity, thermal_sensation) {
    this._data.push([feels_like_temperature, cloth_insulation, activity, thermal_sensation])

    function distance(prep_flt, prep_ci, prep_a) {
      return (feels_like_temperature - prep_flt) ** 2
        + (cloth_insulation - prep_ci) ** 2
        + (activity - prep_a) ** 2
    }

    if (this._prep_data.length > 0) {
      let nearest = this._prep_data.reduce((acc, cur, index) => {
        let cur_distance = distance(...cur)
        return cur_distance < acc.distance ? {index: index, distance: cur_distance} : acc
      }, {index: -1, distance: Number.MAX_VALUE})
      this._prep_data.splice(nearest.index, 1)
    }

    this.update()
  }

  predict(feels_like_temperature, cloth_insulation, activity) {
    return this._model.predict([[feels_like_temperature, cloth_insulation, activity]]).get(0, 0)
  }
}

export default UserModel