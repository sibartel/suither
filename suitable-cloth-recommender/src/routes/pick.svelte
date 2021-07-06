<style>
	fieldset {
		border: none;
	}

	.fields {
		margin-left: 20px;
	}
</style>

<script>
	import Recommender from "../logic/recommender.mjs"
	import { dataStore } from "../stores/dataStore.js"

	import {TextField, Radio, Switch, Slider, Button, Divider, Card, CardTitle, CardSubtitle, CardActions, ProgressCircular} from 'svelte-materialify/src'

	const categories = Recommender.get_categories()

	$: recs = Recommender.get().then(async r => {
		await r.reset_model(0) // model should not be resetted here, check for cold-start
		return r.recommend(
			$dataStore.recommender_settings.relevant_hours,
			$dataStore.recommender_settings.activity,
			$dataStore.recommender_settings.category,
			$dataStore.recommender_settings.ignore_rain
		)
	}, console.error)

	const selectOutfit = (cs) => {
		dataStore.update(current => ({
			...current,
			current_cloth_set: cs
		}))
	}
	
</script>

<svelte:head>
	<title>Suither</title>
</svelte:head>

<fieldset>
	<legend>How long are we out today?</legend>
	<div class="fields">
		<Slider step={1} bind:value={$dataStore.recommender_settings.relevant_hours} thumb min={1} max={16}>
			<span slot="append-outer">
				<TextField bind:value={$dataStore.recommender_settings.relevant_hours} style="width: 80px;">
					<div slot="append">
						hours
					</div>
				</TextField>
			</span>
		</Slider>
	</div>
</fieldset>

<fieldset>
	<legend>How hard will we push ourselves physically today?</legend>
	<div class="fields">
		<Slider min={45} max={400} bind:value={$dataStore.recommender_settings.activity}>
			<span slot="prepend-outer">
				Relax
			</span>
			<span slot="append-outer">
				Heavy Sport
			</span>
		</Slider>
	</div>
</fieldset>

<fieldset>
	<legend>What style do we wear today?</legend>
	<div class="fields">
		<Radio bind:group={$dataStore.recommender_settings.category} value={null}>Show me all</Radio>
		{#each categories as c}
			<Radio bind:group={$dataStore.recommender_settings.category} value={c}>{c}</Radio>
		{/each}
	</div>
</fieldset>

<fieldset>
	<legend>Any other things you want me to consider?</legend>
	<div class="fields">
		<Switch bind:checked={$dataStore.recommender_settings.ignore_rain}>Ignore rain</Switch>
	</div>
</fieldset>

<Divider />

<div class="d-flex flex-wrap justify-space-around mt-4 mb-4">
	{#await recs}
		<ProgressCircular indeterminate color="primary" />
	{:then recs}
		{#each recs as rec}
			<Card style="max-width:350px; margin: 15px 10px;">
				<img style="max-width: 100%;" src={rec.filename} alt="">
				<CardTitle style="word-break: normal;">{rec.description}</CardTitle>
				<CardSubtitle>Mean : {rec.predicted_thermal_sensation.mean.toPrecision(4)}</CardSubtitle>
				<CardActions>
					<Button text class="primary-text" on:click={() => selectOutfit(rec)}>Select</Button>
				</CardActions>
			</Card>
		{:else}
			<p>No recommendations found, maybe adjust the settings. Answer from recommender: {JSON.stringify(recs)}</p>	
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>