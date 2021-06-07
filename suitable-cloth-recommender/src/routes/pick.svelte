<style>
</style>

<script>
	import { goto } from '@sapper/app';
	let topic = 1;
	const handleClick = () => {
		goto('/pick2')
	}
</script>

<svelte:head>
	<title>Pick</title>
 </svelte:head>

<h1>Pick todays outfit</h1>

<p>Todays weather 🌤 23°C 🌧 10%
</p>

<p>
<label>
	<input type=radio bind:group={topic} value={1}>
	Business
</label>
</p>

<p>
<label>
	<input type=radio bind:group={topic} value={2}>
	Sport
</label>
</p>

<p>
<label>
	<input type=radio bind:group={topic} value={3}>
	Free time
</label>
</p>

<button on:click={handleClick}>	Select </button>