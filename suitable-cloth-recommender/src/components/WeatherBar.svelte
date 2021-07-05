<script>
    import weather from "../logic/weather-api.mjs"

    let temp = 0;
    let rain_perc = 0.0;

    weather.get_weather_current().then(forecast => temp = forecast.feels_like);
    weather.get_weather_today().then(forecast => rain_perc = forecast.pop);
</script>


🌤 {temp}°C 🌧 {rain_perc * 100}%
