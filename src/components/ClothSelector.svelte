<style>
	fieldset {
		border: none;
	}

	.fields {
		margin-left: 20px;
	}
</style>

<script>
	import Recommender from '../logic/recommender.mjs'
	import { dataStore } from '../stores/dataStore.js'

	import { Alert, Icon, TextField, Radio, Switch, Slider, Button, Divider, ProgressCircular } from 'svelte-materialify/src'
	import { mdiAlert } from '@mdi/js'

	import ClothCard from '../components/ClothCard.svelte'

	const categories = Recommender.get_categories()

	$: recs = Recommender.get().then(async r => {
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

<fieldset>
	<legend>How long are we out today?</legend>
	<div class="fields">
		<Slider step={1} bind:value={$dataStore.recommender_settings.relevant_hours} thumb min={1} max={16}>
			<span slot="append-outer">
				<TextField bind:value={$dataStore.recommender_settings.relevant_hours} style="width: 80px;">
					<div slot="append" class="text--secondary">
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
			<span slot="prepend-outer" class="text--secondary">
				Relax
			</span>
			<span slot="append-outer" class="text--secondary">
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

<div class="d-flex flex-wrap justify-space-around align-start mt-4 mb-4">
	{#await recs}
		<ProgressCircular indeterminate color="primary" />
	{:then recs}
		{#each recs as rec}
			<ClothCard data={rec}>
				<Button slot="button" class="primary-color black-text" block on:click={() => selectOutfit(rec)}>Select</Button>
			</ClothCard>
		{:else}
			<p>No recommendations found, maybe adjust the settings. Answer from recommender: {JSON.stringify(recs)}</p>	
		{/each}
	{:catch error}
		<Alert class="error-text" dense>
			<div slot="icon">
				<Icon path={mdiAlert} />
			</div>
			{error.message}
		</Alert>
	{/await}
</div>