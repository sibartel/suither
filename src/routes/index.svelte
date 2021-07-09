<style>
	fieldset {
		border: none;
	}

	.fields {
		margin-left: 20px;
	}
</style>

<script>
	import { Alert, Icon, Button, ProgressCircular } from 'svelte-materialify/src'
	import { mdiAlert } from '@mdi/js'
	
	import { dataStore } from '../stores/dataStore.js'
	import ClothSelector from '../components/ClothSelector.svelte'
	import ClothEvaluator from '../components/ClothEvaluator.svelte'
	import ThermalSensationInputSlider from '../components/ThermalSensationInputSlider.svelte'
	import Recommender from '../logic/recommender.mjs'

	let promise_status = Recommender.get().then(async r => await r.model_status(), console.error)

	let thermal_sensation = 0
	const resetModel = async () => {
		$dataStore.self_assessed_sensation_deviation = thermal_sensation

		await Recommender.get().then(async r => {
			await r.reset_model(thermal_sensation)
		})

		promise_status = Recommender.get().then(async r => await r.model_status(), console.error)
	}
</script>

<svelte:head>
	<title>Suither</title>
</svelte:head>

{#await promise_status}
	<div class="mt-10 mb-10 d-flex justify-center">
		<ProgressCircular indeterminate color="primary" />
	</div>
	{:then status}
	{#if !status.initialized}
		<h4>Welcome to Suither</h4>

		<p>We try to support you with your daily cloth selection by proposing
			weather-suitable outfits to you. To know if an outfit is too cold or
			too warm for you, we use a model with a multivariate non-linear regression
			to predict your thermal sensation in a given situation. For this prediction
			the following parameters are taken into account:
		</p>

		<ul class="mb-4">
			<li>Feels like temperature (including real temperature, wind speeds, humidity and sunshine)</li>
			<li>Cloth insulation</li>
			<li>Activity level</li>
		</ul>

		<p>All thermal sensation values are expressed with numbers in the range -3 to 3. The
			perfect clothing for a given situation has the sensation value of 0. A value of -3,
			and thus a sensation that is cold, is achieved by clothing that is clearly too
			thin. The opposite is true for 3 which corresponds to a very warm sensation.
		</p>

		<fieldset>
			<legend>To get started, we need a self-assessment of our own temperature sensation.
				A negative value means that you feel cold faster than the average. Therefore you
				prefer warmer clothing.</legend>
			<div class="fields mt-4">
				<ThermalSensationInputSlider
					min={-3} max={3} step={0.5}
					bind:thermal_sensation={thermal_sensation}
					init={$dataStore.self_assessed_sensation_deviation} />
			</div>
		</fieldset>

		<Button class="green white-text" on:click={resetModel}>Get Started</Button>
	{:else if !$dataStore.current_cloth_set}
		<ClothSelector />
	{:else}
		<ClothEvaluator />
	{/if}
{:catch error}
	<Alert class="error-text" dense>
		<div slot="icon">
			<Icon path={mdiAlert} />
		</div>
		{error.message}
	</Alert>
{/await}