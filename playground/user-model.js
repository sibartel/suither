//import MLR from "ml-regression-multivariate-linear";
const MLR = require('ml-regression-multivariate-linear');

const x = [
  [0, 0],
  [1, 2],
  [2, 3],
  [3, 4]
];

const y = [
  [0],
  [2],
  [4],
  [6]
];
const mlr = new MLR(x, y);
console.log(mlr.predict([3, 3]));
console.log(mlr.predict([0, 3]));
console.log(mlr.predict([1, 1]));
console.log(mlr.toJSON());

// https://en.wikipedia.org/wiki/Thermal_comfort#Interplay_of_temperature_and_humidity
// https://en.wikipedia.org/wiki/Clothing_insulation