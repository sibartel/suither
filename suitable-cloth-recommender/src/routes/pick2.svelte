<style>
	img{
		max-width: 200px;
		margin: 0 0 1em 0;
	}
</style>

<script>
	import { goto } from '@sapper/app';
	let b1 = false;
	let b2 = false;
	let b3 = false;
	let b4 = false;
	let scoops = 1;
	const handleClick = () => {
		goto('/pick')
	}
	const handleClick2 = () => {
		goto('/review')
	}
</script>

<svelte:head>
	<title>Pick2</title>
 </svelte:head>

<h1>Pick todays outfit</h1>

<p>Todays weather 🌤 23°C 🌧 10%
</p>

<p>	
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=checkbox bind:checked={b1}>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=checkbox bind:checked={b2}>

</p>
<p>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=checkbox bind:checked={b3}>
	<img src="2000px-Stick_Figure.svg.png" alt="">
	<input type=checkbox bind:checked={b4}>
</p>


<button on:click={handleClick}>Back</button>
<button on:click={handleClick2}>Finish</button>

