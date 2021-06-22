<style>
</style>

<script>
	import { goto } from '@sapper/app';
	import weather from "../logic/weather-api.mjs"
	
	let topic = 1;
	const handleClick = () => {
		goto('/pick2')
	}
	let temp = 0;
	weather.get_weather_current().then(forecast => temp = forecast.feels_like);
</script>

<svelte:head>
	<title>Pick</title>
 </svelte:head>

<h1>Pick todays activity</h1>

<p>Todays weather 🌤 {temp}°C 🌧 10%
</p>

<p>
<label>
	<input type=radio bind:group={topic} value={1}>
	Basic
</label>
</p>

<p>
<label>
	<input type=radio bind:group={topic} value={2}>
	Sport
</label>
</p>

<p>
<label>
	<input type=radio bind:group={topic} value={3}>
	Free time
</label>
</p>
<p>
<label>
	<input type=radio bind:group={topic} value={4}>
	Business
</label>
</p>
<button on:click={handleClick}>	Select </button>