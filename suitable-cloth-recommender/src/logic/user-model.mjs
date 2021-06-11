import Regressor from "./regressor.mjs"
import {Matrix} from "ml-matrix"

// https://en.wikipedia.org/wiki/Thermal_comfort#Interplay_of_temperature_and_humidity
// https://en.wikipedia.org/wiki/Clothing_insulation

const DEFAULT_WEIGHTS = Matrix.columnVector([7.7, -1.8e-1, -4.6, -1.2e-2])

class UserModel {
  constructor(options) {
    const {data = [], model = new Regressor({
      weights: DEFAULT_WEIGHTS
    })} = options
    this._data = data
    this._model = model
    this.update()
  }

  toJSON(_) {
    return {
      data: this._data,
      model: this._model
    }
  }

  update() {
    let x = this._data.map((set) => set.slice(0, -1))
    let y = this._data.map((set) => set.slice(-1))
    this._model.train(x, y)
  }

  feedback(feels_like_temperature, cloth_insulation, activity, thermal_sensation) {
    this._data.append([feels_like_temperature, cloth_insulation, activity, thermal_sensation])
    this.update()
  }

  predict(feels_like_temperature, cloth_insulation, activity) {
    return this._model.predict([[feels_like_temperature, cloth_insulation, activity]]).get(0, 0)
  }
}

export default UserModel