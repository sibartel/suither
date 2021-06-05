import { PolynomialRegressor } from 'regression-multivariate-polynomial';

class Model {
  constructor(data) {
    this._model = new PolynomialRegressor(3)
    this._data = data
    this.update()
  }

  toJSON(_) {
    return this._data
  }

  update() {
    let x = this._data.map((set) => set.slice(0, -1))
    let y = this._data.map((set) => set.slice(-1))
    this._model.fit(x, y)
  }

  feedback(feels_like_temperature, cloth_insulation, activity, thermal_sensation) {
    this._data.append([feels_like_temperature, cloth_insulation, activity, thermal_sensation])
    this.update()
  }

  predict(feels_like_temperature, cloth_insulation, activity) {
    return this._model.predict([[feels_like_temperature, cloth_insulation, activity]])[0][0]
  }
}


// feels_like_temperature, cloth_insulation, activity, thermal_sensation
const test_data = [
  [  0, 0.57,  60, -3 ],
  [  5, 0.57,  60, -3 ],
  [ 10, 0.57,  60, -3 ],
  [ 15, 0.57,  60, -2 ],
  [ 20, 0.57,  60,  0 ],
  [ 25, 0.57,  60,  0 ],
  [ 30, 0.57,  60,  1 ],
  [ 35, 0.57,  60,  3 ],
  [ 20, 0.36,  60, -2 ],
  [ 20, 0.57,  60, -1 ],
  [ 20, 0.61,  60,  0 ],
  [ 20, 0.96,  60,  1 ],
  [ 20, 1.30,  60,  3 ],
  [ 20, 0.74,  60,  1 ],
  [ 20, 0.57,  60, -1 ],
  [ 20, 0.57, 120,  0 ],
  [ 20, 0.57,  48, -3 ],
  [ 20, 0.57, 180,  1 ],
]

let m = new Model(test_data)
console.log(m.predict(23, 0.7, 60))

console.log(JSON.stringify(m))

// https://en.wikipedia.org/wiki/Thermal_comfort#Interplay_of_temperature_and_humidity
// https://en.wikipedia.org/wiki/Clothing_insulation