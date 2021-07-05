<style>
	input {
		background-color: rgb(255, 255, 255);
	}
	p {
		max-width: 400px;
	}
</style>

<script>
	import Recommender from "../logic/recommender.mjs"
	import WeatherBar from '../components/WeatherBar.svelte' ;
	import { dataStore } from "../stores/dataStore.js"
	import { onDestroy } from "svelte";

	import {Radio, Switch, Slider, Button, Divider, Card, CardTitle, CardSubtitle, CardActions, ProgressCircular} from 'svelte-materialify/src'

	let data;
	const unsubscribe = dataStore.subscribe(value => {
		data = value;
	});
	onDestroy(unsubscribe);
	
	let category = null;
	let hours_to_spent = data.hours_to_spent;
	let activity_int = data.activity_level;
	let ignore_rain = true;
	let min=45; let max=400;

	let categories = Recommender.get_categories()

	$: recs = Recommender.get().then(async r => {
		await r.reset_model(0) // model should not be resetted here
		return r.recommend(hours_to_spent, activity_int, category, ignore_rain)
	})

	const handleClick = () => {
		dataStore.update(current => {
			current.activity = category;
			current.hours_to_spent = hours_to_spent;
			current.activity_level = activity_int;
			return current;
		})
	}
	
</script>

<svelte:head>
	<title>Suither</title>
</svelte:head>

<WeatherBar/>

<Radio bind:group={category} value={null}>All</Radio>
{#each categories as c}
	<Radio bind:group={category} value={c}>{c}</Radio>
{/each}

Hours to spent:
<input bind:value={hours_to_spent}>

<Switch bind:checked={ignore_rain}>Ignore rain</Switch>

<p>
<Slider {min} {max} bind:value={activity_int}>
	<span slot="prepend-outer">
		Relax
	</span>
	<span slot="append-outer">
		Heavy Sport
	  </span>
</Slider>
</p>

<Divider />

<div class="d-flex flex-wrap justify-space-around mt-4 mb-4">
	{#await recs}
		<ProgressCircular indeterminate color="primary" />
	{:then recs}
		{#each recs as rec}
			<Card style="max-width:350px; margin: 15px 10px;">
				<img style="max-width: 100%;" src={rec.filename} alt="">
				<CardTitle style="word-break: normal;">{rec.description}</CardTitle>
				<CardSubtitle>{rec.description} : {rec.predicted_thermal_sensation.mean.toPrecision(4)}</CardSubtitle>
				<CardActions>
					<Button text class="primary-text">Select</Button>
				</CardActions>
			</Card>
		{:else}
			<p>No recommendations found, answer from recommender: {JSON.stringify(recs)}</p>	
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>