import {Matrix} from 'ml-matrix'

export default class Regressor {
  constructor(options) {
    const {number_epochs = 1e6, learning_rate = 1e-5, weights = undefined} = options
    this.number_epochs = number_epochs
    this.learning_rate = learning_rate
    this.weights = weights ? Matrix.checkMatrix(weights) : undefined;
  }

  toJSON(_) {
    return {
      number_epochs: this.number_epochs,
      learning_rate: this.learning_rate,
      weights: this.weights
    }
  }

  train(features, target) {
    features = Matrix.checkMatrix(features)
    target = Matrix.checkMatrix(target)

    let weights = this.weights ?? Matrix.zeros(1 + features.columns, 1)

    for (let epoch = 0; epoch < this.number_epochs; epoch++) {
      let cum_error = 0
      for (let row in shuffled_indices(features.rows)) {
        const step_features = features.getRowVector(row)
        const step_target = target.get(row, 0)

        const prediction = this.predict(step_features, weights).get(0, 0)
        const error = step_target - prediction

        const gradient = this.derivative_function(step_features, weights).mul(error)
        weights = weights.add(gradient.mul(this.learning_rate).transpose())
        cum_error += Math.abs(error)
      }
      console.log(`Epoch ${epoch}/${this.number_epochs}: ${cum_error / features.rows}`)
    }

    this.weights = weights;
    console.log(`Final weights: ${weights}`)
  }

  predict(features, weights) {
    return this.target_function(Matrix.checkMatrix(features), weights ?? this.weights)
  }

  target_function(features, weights) {
    let mod_features = features.clone().addColumn(0, Matrix.ones(features.rows, 1))
    return Matrix.add(mod_features.mmul(weights).exp(), (1)).pow(-1).mul(6).sub(3)
  }

  derivative_function(features, weights) {
    let mod_features = features.clone().addColumn(0, Matrix.ones(features.rows, 1))
    return Matrix.add(
      mod_features.mmul(weights).exp(), (1)
    ).pow(-2).mul(6).mul(mod_features.mmul(weights).exp()).mmul(mod_features).neg()
  }
}

function shuffle(array) {
  let current = array.length
  let random

  while (0 !== current) {
    random = Math.floor(Math.random() * current)
    current--

    [array[current], array[random]] = [array[random], array[current]]
  }

  return array
}

function shuffled_indices(end) {
  let indices = [...Array(end).keys()]
  return shuffle(indices)
}