<style>
	fieldset {
		border: none;
	}

	.fields {
		margin-left: 20px;
	}
</style>

<script>
  	import {goto} from '@sapper/app'
	import {Button, Slider, Alert, Icon} from 'svelte-materialify/src'
	import { mdiAlert } from '@mdi/js'
	import Recommender from "../logic/recommender.mjs"
	import { dataStore } from "../stores/dataStore.js"

	// On each load the value used to reset the model should be displayed and not the last selected
	let current_selection = $dataStore.self_assessed_sensation_deviation

	const resetModel = async () => {
		$dataStore.self_assessed_sensation_deviation = current_selection

		await Recommender.get().then(async r => {
			await r.reset_model($dataStore.self_assessed_sensation_deviation / 2)
		})

		goto('/')
	}

	//const emojis = ['❄️ ❄️ ❄️ ', '❄️ ❄️ ', '❄️ ', '☁️', '🔥', '🔥🔥', '🔥🔥🔥'];
  	//const customThumb = (v) => emojis[Math.min(Math.floor((v+300) / 7), 300)];
</script>

<svelte:head>
	<title>Suither - Reset</title>
</svelte:head>

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

<Alert class="error-text" dense outlined>
	<div slot="icon">
	  <Icon path={mdiAlert} />
	</div>
	By proceeding the user model will be resetted. All already aquired feedback data will be lost!
</Alert>

<Button class="red white-text" on:click={resetModel}>Reset Model</Button>