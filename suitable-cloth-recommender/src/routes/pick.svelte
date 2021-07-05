<style>
	input {
		background-color: rgb(255, 255, 255);
	}
	p {
		max-width: 400px;
	}
</style>

<script>
	import { goto } from '@sapper/app';
	import WeatherBar from '../components/WeatherBar.svelte' ;
	import { dataStore } from "../stores/dataStore.js"
	import { onDestroy } from "svelte";

	import {Slider, Button} from 'svelte-materialify/src'

	let data;
	const unsubscribe = dataStore.subscribe(value => {
		data = value;
	});
	onDestroy(unsubscribe);
	
	let topic = data.activity;
	let hours_to_spent = data.hours_to_spent;
	let activity_int = data.activity_level;
	let min=45; let max=400;

	const handleClick = () => {
		dataStore.update(current => {
			current.activity = topic;
			current.hours_to_spent = hours_to_spent;
			current.activity_level = activity_int;
			return current;
		})
		
		goto('/pick2')
	}
	
</script>

<svelte:head>
	<title>Pick</title>
 </svelte:head>

<h1>Pick todays activity</h1>

<WeatherBar/>


<p>
<label>
	<input type=radio bind:group={topic} value={'Basic'}>
	Basic
</label>
</p>

<p>
<label>
	<input type=radio bind:group={topic} value={"Sport"}>
	Sport
</label>
</p>

<p>
<label>
	<input type=radio bind:group={topic} value={"Free time"}>
	Free time
</label>
</p>
<p>
<label>
	<input type=radio bind:group={topic} value={"Business"}>
	Business
</label>
</p>

Hours to spent:
<input bind:value={hours_to_spent}>

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

<Button on:click={handleClick}>Select</Button>