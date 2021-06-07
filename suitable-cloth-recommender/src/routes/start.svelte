<script>
  	import { goto } from '@sapper/app';

	let name = '';
	let topic = 1;
	let age = '';
	let weight = '';
	let heigth = '';

	const handleClick = () => {
		goto('/start2')
	}
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
<p>
	<button on:click={handleClick}>Confirm</button>
</p>