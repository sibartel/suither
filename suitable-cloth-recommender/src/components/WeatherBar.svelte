<script>
	import { dataStore } from '../stores/dataStore.js'
    import weather from '../logic/weather-api.mjs'

    let temperature = '-'
    let precipitation_probability = '-'

    $: weather.get_weather_forecast().then(hourly_forecast => {
        let forecast = hourly_forecast.slice(0, $dataStore.recommender_settings.relevant_hours)
        temperature = Math.max(...forecast.map(data => data.feels_like))
        precipitation_probability = Math.max(...forecast.map(data => data.pop))
    })
</script>


🌤 {temperature}°C 🌧 {precipitation_probability * 100}%
