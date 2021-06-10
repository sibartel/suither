import {Matrix} from 'ml-matrix'

export default class Regressor {
  constructor(weights = undefined, number_epochs = 1000000, learning_rate = 0.00001) {
    this.number_epochs = number_epochs
    this.learning_rate = learning_rate
    this.weights = weights ? Matrix.checkMatrix(weights) : undefined;
  }

  train(features, target) {
    features = Matrix.checkMatrix(features)
    target = Matrix.checkMatrix(target)

    let weights = this.weights ?? Matrix.zeros(1 + features.columns, 1)

    for (let epoch = 0; epoch < this.number_epochs; epoch++) {
      let cum_error = 0
      for (let row = 0; row < features.rows; row++) {
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