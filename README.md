# Suither - A Clothing Recommender

A prototype PWA with the intent to propose weather-suitable outfits to support the users with their daily clothing selection.

This project was developed as part of the *Intelligent User Interfaces* course @ University of Bayreuth in the SS21.

A live demo can be found under https://sibartel.github.io/suither/. For the best experience use your mobile browser to add the PWA to your homescreen.

## Features
* Progressive Web App
* All data and calculations are performed locally on the device

* Hourly analysis of upcoming weather regarding thermal sensation and precipitation taking different possible clothing variants into account
* Multivariate non-linear regression as user model predicting the thermal sensation based on:
    * Feels like temperature
    * Clothing insulation
    * Activity level
* Support for different clothing categories
* User feedback is used to improve the predicter model

## Usage
### Development

```bash
npm install # or yarn
npm run dev
```

This will start the development server on [localhost:3000](http://localhost:3000).

### Production

```bash
export NODE_ENV=production; npx sapper export --basepath 'suither'
```

The static exported project files are located under [\_\_sapper\_\_/export/suither](__sapper__/export/suither).

Depending on your hosting environment you maybe want to adjust the basepath in the previous command and in [src/server.js#L9](src/server.js#L9):
```js
const url = dev ? '/' : '/suither' <-- here
```

## License
suither is licensed under the [MIT](LICENSE) license.