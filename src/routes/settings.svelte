<style>
	fieldset {
		border: none;
	}

	.fields {
		margin-left: 20px;
	}
</style>

<script>
  	import { goto } from '@sapper/app'
	import { ProgressCircular, Button, Alert, Icon, Divider, Radio } from 'svelte-materialify/src'
	import { mdiAlert } from '@mdi/js'
	
	import Recommender from '../logic/recommender.js'
	import { dataStore } from '../stores/dataStore.js'
	import ThermalSensationInputSlider from '../components/ThermalSensationInputSlider.svelte'

	let promise_status = Recommender.get().then(async r => await r.model_status(), console.error)

	// On each load the value used to reset the model should be displayed and not the last selected
	let thermal_sensation = $dataStore.self_assessed_sensation_deviation

	const resetModel = async () => {
		$dataStore.self_assessed_sensation_deviation = thermal_sensation

		await Recommender.get().then(async r => {
			await r.reset_model(thermal_sensation)
		})

		goto('.')
	}
</script>

<svelte:head>
	<title>Suither - Reset</title>
</svelte:head>

{#await promise_status}
	<ProgressCircular indeterminate color="primary" />
{:then status}

	<h4>Select Theme</h4>

	<fieldset>
		<legend>Which theme do you want to have?</legend>
		<div class="fields">
			<Radio bind:group={$dataStore.theme} value={'system'}>System theme</Radio>
			<Radio bind:group={$dataStore.theme} value={'dark'}>Dark theme</Radio>
			<Radio bind:group={$dataStore.theme} value={'light'}>Light theme</Radio>
		</div>
	</fieldset>

	<Divider class="mt-6 mb-4" />

	<h4>Reset User Model</h4>

	<fieldset>
		<legend>How would you self assess your thermal sensitivity?</legend>
		<div class="fields">
			<ThermalSensationInputSlider
				min={-3} max={3} step={0.5}
				bind:thermal_sensation={thermal_sensation}
				init={$dataStore.self_assessed_sensation_deviation} />
		</div>
	</fieldset>

	{#if status.initialized}
		<Alert class="warning-text" dense outlined>
			<div slot="icon">
				<Icon path={mdiAlert} />
			</div>
			By proceeding the user model will be resetted. All already aquired feedback data will be lost!
		</Alert>
	{/if}

	<Button class="red white-text" on:click={resetModel}>Reset Model</Button>

	<Divider class="mt-6 mb-4" />

	<h4>Delete localStorage</h4>

	
	<Alert class="warning-text" dense outlined>
		<div slot="icon">
			<Icon path={mdiAlert} />
		</div>
		By proceeding all data stored in the localStorage will be deleted. This includes the complete model
		and all other settings.
	</Alert>

	<Button class="red white-text" on:click={async () => {
		localStorage.clear()
		await goto('.')
		location.reload()
	}}>Delete localStorage</Button>
{:catch error}
	<Alert class="error-text" dense>
		<div slot="icon">
			<Icon path={mdiAlert} />
		</div>
		{error.message}
	</Alert>
{/await}
