<script>
	import Nav from '../components/Nav.svelte';
	import { dataStore } from "../stores/dataStore.js"
	import { onDestroy } from "svelte";
	export let segment;

	let data;
	const unsubscribe = dataStore.subscribe(value => {
		data = value;
	});
	onDestroy(unsubscribe);
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: rgb(247, 245, 245);
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main> 