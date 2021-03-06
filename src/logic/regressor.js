import { Matrix } from 'ml-matrix'

export default class Regressor {
  constructor(options) {
    const {
      number_epochs = 1e4,
      batch_size = undefined,
      learning_rate = 1e-4,
      weights = undefined,
      last_mse = undefined
    } = options
    this.number_epochs = number_epochs
    this.batch_size = batch_size
    this.learning_rate = learning_rate
    this.weights = weights ? Matrix.checkMatrix(weights) : undefined
    this.last_mse = last_mse
  }

  toJSON(_) {
    return {
      number_epochs: this.number_epochs,
      batch_size: this.batch_size,
      learning_rate: this.learning_rate,
      weights: this.weights,
      last_mse: this.last_mse
    }
  }

  train(features, target, quiet=true) {
    features = Matrix.checkMatrix(features)
    target = Matrix.checkMatrix(target)

    let weights = this.weights ?? Matrix.zeros(1 + features.columns, 1)

    for (let epoch = 0; epoch < this.number_epochs; epoch++) {
      let sum_squared_error = 0
      for (let rows of batched_indices(features.rows, this.batch_size ?? features.rows)) {
        const step_features = features.subMatrixRow(rows)
        const step_target = target.subMatrixRow(rows)

        const prediction = this.predict(step_features, weights)
        const error = prediction.sub(step_target)

        let mod_features = step_features.clone().addColumn(0, Matrix.ones(step_features.rows, 1))
        const gradient = Matrix.columnVector(
          mod_features.mulColumnVector(error).transpose().mean('row')
        )
        weights = weights.add(gradient.mul(this.learning_rate))
        sum_squared_error += error.pow(2).transpose().mmul(Matrix.ones(error.rows, 1)).get(0, 0)
      }
      this.last_mse = sum_squared_error / features.rows
      if (!quiet)
        console.log(`Epoch: ${epoch}/${this.number_epochs}; MSE: ${this.last_mse}`)
    }

    this.weights = weights;
    if (!quiet)
      console.log(`Final weights: ${weights}`)
  }

  predict(features, weights) {
    features = Matrix.checkMatrix(features)
    let mod_features = features.clone().addColumn(0, Matrix.ones(features.rows, 1))
    return Matrix.add(
      mod_features.mmul(weights ?? this.weights).exp(),
      1
    ).pow(-1).mul(6).sub(3)
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

function shuffled_indices(array_size) {
  let indices = [...Array(array_size).keys()]
  return shuffle(indices)
}

function* batched_indices(array_size, batch_size) {
  let indices = shuffled_indices(array_size)
  while(indices.length > 0)
    yield indices.splice(0, batch_size)
}