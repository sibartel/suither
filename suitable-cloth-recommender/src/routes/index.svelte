<script>
	import { onDestroy } from "svelte";
	import { dataStore } from "../stores/dataStore.js"

	let data;
	const unsubscribe = dataStore.subscribe(value => {
		data = value;
	});
	onDestroy(unsubscribe);

	//console.log(data);

	/* dataStore.update(current => {
		current.name = "Hubert"
		return current
	})  */


</script>

<style>
	h1  {
		text-align: center;
		margin: 0 auto;
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Home</title>
</svelte:head>

<a href="pick">Get Started</a>