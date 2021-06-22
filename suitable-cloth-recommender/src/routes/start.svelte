<style>
	input {
		background-color: rgb(255, 255, 255);
	}
	p {
		max-width: 400px;
	}
	button{
		background-color:rgb(255, 255, 255);
		border-color: rgb(0, 0, 0);
	}
</style>

<script>
  	import {goto} from '@sapper/app';
	import {Slider} from 'svelte-materialify'

	let name = '';
	let age = '';
	let weight = '';
	let heigth = '';
	let heat = 0.0;
	let min = -300;
	let max = 300;

	const handleClick = () => {
		console.log(heat);
		goto('/start2')
	}

	//const emojis = ['❄️ ❄️ ❄️ ', '❄️ ❄️ ', '❄️ ', '☁️', '🔥', '🔥🔥', '🔥🔥🔥'];
  	//const customThumb = (v) => emojis[Math.min(Math.floor((v+300) / 7), 300)];
</script>

<svelte:head>
	<title>Start</title>
 </svelte:head>

<h1>Getting started</h1>

<p>Name
	<input bind:value={name}>
</p>
<div>
<p>Gender
	<label>
		<input type=checkbox>
		m
	</label>
	<label>
		<input type=checkbox>
		f
	</label>
	<label>
		<input type=checkbox>
		d
	</label>
</p>
</div>
	
<p>Age:
	<input bind:value={age}>
	years old
</p>
<p>Weight
	<input bind:value={weight}>
	kg
</p>
<p>Heigth
	<input bind:value={heigth}>
	cm
</p>
<p> Heat self assesment
	
	<Slider {min} {max} bind:value={heat}>
		<span slot="prepend-outer">
			❄️
		</span>
		<span slot="append-outer">
			🔥
		  </span>
	</Slider>
	
</p>
{heat}
<p>
	<button on:click={handleClick}>Confirm</button>
</p>