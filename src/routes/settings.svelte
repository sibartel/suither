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
	import { ProgressCircular, Button, Slider, Alert, Icon, Divider } from 'svelte-materialify/src'
	import { mdiAlert } from '@mdi/js'
	
	import Recommender from '../logic/recommender.mjs'
	import { dataStore } from '../stores/dataStore.js'

	let promise_status = Recommender.get().then(async r => await r.model_status(), console.error)

	// On each load the value used to reset the model should be displayed and not the last selected
	let current_selection = $dataStore.self_assessed_sensation_deviation

	const resetModel = async () => {
		$dataStore.self_assessed_sensation_deviation = current_selection

		await Recommender.get().then(async r => {
			await r.reset_model($dataStore.self_assessed_sensation_deviation / 2)
		})

		goto('.')
	}

	//const emojis = ['❄️ ❄️ ❄️ ', '❄️ ❄️ ', '❄️ ', '☁️', '🔥', '🔥🔥', '🔥🔥🔥'];
  	//const customThumb = (v) => emojis[Math.min(Math.floor((v+300) / 7), 300)];
</script>

<svelte:head>
	<title>Suither - Reset</title>
</svelte:head>

{#await promise_status}
	<ProgressCircular indeterminate color="primary" />
{:then status}
	<h4>Reset model</h4>

	<fieldset>
		<legend>How would you self assess your thermal sensitivity?</legend>
		<div class="fields">
			<Slider step={1} thumb min={-10} max={10} bind:value={current_selection}>
				<span slot="prepend-outer">
					❄️
				</span>
				<span slot="append-outer">
					🔥
				</span>
			</Slider>
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

	<Button class="red white-text" on:click={() => {
		localStorage.clear()
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
