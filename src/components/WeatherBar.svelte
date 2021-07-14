<script>
	import { onMount } from 'svelte'
    import { dataStore } from '../stores/dataStore.js'
    import weather from '../logic/weather-api.js'

    let temperature = '-'
    let precipitation_probability = '-'

    const update_weather = (relevant_hours) => {
        weather.get_weather_forecast().then(hourly_forecast => {
            let forecast = hourly_forecast.slice(0, relevant_hours)
            temperature = Math.max(...forecast.map(data => data.feels_like))
            precipitation_probability = Math.max(...forecast.map(data => data.pop))
        })
    }

    onMount(() => {
        const unsubscribe = dataStore.subscribe(data => {
            update_weather(data.recommender_settings.relevant_hours)
        })

        return unsubscribe
    })
</script>

🌤 {temperature}°C 🌧 {precipitation_probability === '-' ? '-' : precipitation_probability * 100}%
