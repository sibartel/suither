import MLR from "ml-regression-multivariate-linear"

// https://en.wikipedia.org/wiki/Thermal_comfort#Interplay_of_temperature_and_humidity
// https://en.wikipedia.org/wiki/Clothing_insulation

class UserModel {
  constructor(data) {
    this._data = data
    this.update()
  }

  toJSON(_) {
    return this._data
  }

  update() {
    let x = this._data.map((set) => set.slice(0, -1))
    let y = this._data.map((set) => set.slice(-1))
    this._model = new MLR(x, y)
  }

  feedback(feels_like_temperature, cloth_insulation, activity, thermal_sensation) {
    this._data.append([feels_like_temperature, cloth_insulation, activity, thermal_sensation])
    this.update()
  }

  predict(feels_like_temperature, cloth_insulation, activity) {
    return this._model.predict([[feels_like_temperature, cloth_insulation, activity]])[0][0]
  }
}

export default UserModel