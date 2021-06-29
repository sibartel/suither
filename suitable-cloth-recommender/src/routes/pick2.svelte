<style>
	img{
		max-width: 200px;
		margin: 0 0 1em 0;
	}
</style>

<script>
	import { goto } from '@sapper/app';
	import weather from "../logic/weather-api.mjs";

	import {cloth_sets} from "../logic/cloth_sets.mjs"
	import {default_model_data} from "../logic/default_model_data.mjs"
	import Recommender from "../logic/recommender.mjs"

	let option = 1;
	let recs = []
	
	const handleClick = () => {
		goto('/pick')
	}
	const handleClick2 = () => {
		goto('/review')
	}

	let r = new Recommender(cloth_sets, default_model_data)
	r.recommend(4, 60).then((r) => recs = r)

	let temp = 0;
	weather.get_weather_current().then(forecast => temp = forecast.feels_like);

	let rain_perc = 0;
	weather.get_weather_current().then(forecast => console.log(''));

</script>

<svelte:head>
	<title>Pick</title>
</svelte:head>

<div>
<h1>Pick todays outfit</h1>

<p>Todays weather 🌤 {temp}°C 🌧️ {rain_perc}%
</p>
</div>

{#each recs as rec}
	<div>
		{rec.description} : {rec.predicted_thermal_sensation.mean.toPrecision(4)}
	</div>	
	<img src={rec.filename} alt="">
	<input type=radio>
{:else}
	<p></p>	
{/each}
<!-- 
<div>
    <p>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=radio bind:group={option} value={1}>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=radio bind:group={option} value={2}>
    </p>

    <p>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=radio bind:group={option} value={3}>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=radio bind:group={option} value={4}>
    </p>

    <p>
	<button on:click={handleClick}>Back</button>
	<button on:click={handleClick2}>Finish</button>
    </p>

    Selected Option: {option}
</div> -->
<p>
	<button on:click={handleClick}>Back</button>
	<button on:click={handleClick2}>Finish</button>
</p>