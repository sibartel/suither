<style>
	img{
		max-width: 200px;
		margin: 0 0 1em 0;
	}
</style>

<script>
	let b1 = false;
	let b2 = false;
	let b3 = false;
	let b4 = false;
	let scoops = 1;
	function handleClick() {
	}
</script>

<svelte:head>
	<title>Review</title>
 </svelte:head>

<h1>Review todays outfit</h1>

<p>Todays weather 🌤 23°C 🌧 10%
</p>

<p>	
	<img src="2000px-Stick_Figure.svg.png" alt=""> 
</p>
<p>
...
</p>
<p>
...
</p>
<p>
...
</p>



<button on:click|once={handleClick}>
	Confirm
</button>