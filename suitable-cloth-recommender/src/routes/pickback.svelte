<style>
	img{
		max-width: 200px;
		margin: 0 0 1em 0;
	}
</style>

<script>
	import { goto } from '@sapper/app';
	import {cloth_sets} from "../logic/cloth_sets.mjs"
	import {default_model_data} from "../logic/default_model_data.mjs"
	import Recommender from "../logic/recommender.mjs"
	import weather from "../logic/weather-api.mjs"

	let b1 = false;
	let b2 = false;
	let b3 = false;
	let b4 = false;
	
	const handleClick = () => {
		goto('/pick')
	}
	const handleClick2 = () => {
		goto('/review')
	}

	/* let recs = [{description : ''}];
	let r = new Recommender(cloth_sets, default_model_data);
	r.recommend(4, 60).then((r) => recs = r); */

	let temp = 0;
	weather.get_weather_current().then(forecast => temp = forecast.feels_like);

	let rain_perc = 0;
	weather.get_weather_current().then(forecast => console.log(forecast));

</script>

<svelte:head>
	<title>Pick2</title>
</svelte:head>

<div>
<h1>Pick todays outfit</h1>

<p>Todays weather 🌤 {temp}°C 🌧️ {rain_perc}%
</p>
</div>

<!-- {#each recs as rec}
	<div>
		{rec.description}
	</div>	
{:else}
	<p></p>	
{/each} -->

<div>
<p>	
	<img src="a.png" alt="">
	<input type=checkbox bind:checked={b1}>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=checkbox bind:checked={b2}>

</p>
<p>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=checkbox bind:checked={b3}>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=checkbox bind:checked={b4}>
</p>

</div>
<div>
	<button on:click={handleClick}>Back</button>
	<button on:click={handleClick2}>Finish</button>
</div>
