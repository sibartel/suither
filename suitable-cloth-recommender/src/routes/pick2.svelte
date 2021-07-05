<style>
	img{
		width: 200px;
		height: 200px;
		margin: 0 0 1em 0;
	}
</style>

<script>
	import { goto } from '@sapper/app';
	import Tooltip from '../components/Tooltip.svelte';
	import { onMount } from 'svelte';

	import {cloth_sets} from "../logic/cloth_sets.mjs"
	import {default_model_data} from "../logic/default_model_data.mjs"
	import Recommender from "../logic/recommender.mjs"
	import About from './about.svelte';
	import WeatherBar from '../components/WeatherBar.svelte';
	import { dataStore } from "../stores/dataStore.js"
	import { onDestroy } from "svelte";

	let data;
	const unsubscribe = dataStore.subscribe(value => {
		data = value;
	});
	onDestroy(unsubscribe);

	let option = 1;
	
	const handleClick = () => {
		goto('/pick')
	}
	const handleClick2 = () => {
		dataStore.update(current => {
			current.outfit_today = recs[1].description;
			current.outfit_picture = recs[2].filename;
			//console.log(data)
			return current;
		})
		goto('/review')
	}

    let recs = Recommender.get().then(async r => {
  		await r.reset_model(0)
  		return r.recommend(4, 60, null, true)
	})
</script>

<svelte:head>
	<title>Pick</title>
</svelte:head>

<div>
<h1>Pick todays outfit</h1>

<WeatherBar/>

</div>

{#await recs}
	<p>...generating</p>
{:then recs}
	{#each recs as rec}
		<Tooltip title={rec.description}>
			{rec.description} : {rec.predicted_thermal_sensation.mean.toPrecision(4)} 
			<img src={rec.filename} alt="">
		</Tooltip>	
		<input type=radio>
	{:else}
		<p>No recommendations found, answer from recommender: {JSON.stringify(recs)}</p>	
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<!-- <button on:click={update}>generate</button>

{#each recs as rec}
	<Tooltip title={rec.description}>
		{rec.description} : {rec.predicted_thermal_sensation.mean.toPrecision(4)} 
		<img src={rec.filename} alt="">
	</Tooltip>	
	<input type=radio>
{:else}
	<p></p>	
{/each} -->

<p>
	<button on:click={handleClick}>Back</button>
	<button on:click={handleClick2}>Finish</button>
</p>

<!-- {#if recs.length > 3}
<div>
    <p>
		<img src={recs[0].filename} alt="">
		<input type=radio bind:group={option} value={1}>
		
	<img src={recs[1].filename} alt="">
	<input type=radio bind:group={option} value={2}>
	</p>

    <p>
	<img src={recs[2].filename} alt="">
	<input type=radio bind:group={option} value={3}>
	<img src={recs[3].filename} alt="">
	<input type=radio bind:group={option} value={4}>
    </p>

    <p>
	<button on:click={handleClick}>Back</button>
	<button on:click={handleClick2}>Finish</button>
    </p>

    Selected Option: {option}
</div> 

{:else}
Loading...
{/if}


<div>
    <p>	
		<Tooltip title={recs[0].description}>	
		<img src={recs[0].filename} alt="" >
		<input type=radio bind:group={option} value={1}>	
		</Tooltip>

		<Tooltip title={recs[1].description}>
		<img src={recs[1].filename} alt="">
		<input type=radio bind:group={option} value={2}>
		</Tooltip>
    </p>

    <p>
		<Tooltip title={recs[2].description}>
		<img src={recs[2].filename} alt="">
		<input type=radio bind:group={option} value={3}>
		</Tooltip>

		<Tooltip title={recs[3].description}>
		<img src={recs[3].filename} alt="">
		<input type=radio bind:group={option} value={4}>
		</Tooltip>
    </p>

    <p>
		<button on:click={handleClick}>Back</button>
		<button on:click={handleClick2}>Finish</button>
    </p>

    Selected Option: {option}
</div> 
 -->

