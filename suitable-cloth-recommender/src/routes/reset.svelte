<style>
	fieldset {
		border: none;
	}

	.fields {
		margin-left: 20px;
	}
</style>

<script>
  	import {goto} from '@sapper/app';
	import {Button, Slider, Alert, Icon} from 'svelte-materialify/src';
	import { mdiAlert } from '@mdi/js'
	import { dataStore } from "../stores/dataStore.js"
	import { onDestroy } from "svelte";

	let data;
	const unsubscribe = dataStore.subscribe(value => {
		data = value;
	});
	onDestroy(unsubscribe);

	let name = data.name;
	let thermal_sensation = data.heat_self_assesment;

	const handleClick = async () => {
		dataStore.update(current => {
			current.name = name;
			current.heat_self_assesment = thermal_sensation;
			return current;
		})

		await Recommender.get().then(async r => {
			await r.reset_model(thermal_sensation / 2)
		})

		goto('/pick')
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
		<Slider step={1} thumb min={-10} max={10} bind:value={thermal_sensation}>
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

<Button class="red white-text" on:click={handleClick}>Reset Model</Button>