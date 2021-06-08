import {cloth_sets} from "./cloth_sets.mjs"
import {default_model_data} from "./default_model_data.mjs"
import Recommender from "./recommender.mjs"
import weather from "./weather-api.mjs"

let r = new Recommender(cloth_sets, default_model_data)
r.recommend(4, 60).then((r) => console.log(r))

weather.get_weather_current().then(forecast => console.log(forecast))