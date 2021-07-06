<script>
	import { dataStore } from '../stores/dataStore.js'
	import ClothSelector from '../components/ClothSelector.svelte'
	import ClothEvaluator from '../components/ClothEvaluator.svelte'
</script>

<svelte:head>
	<title>Suither</title>
</svelte:head>

{#if !$dataStore.current_cloth_set}
	<ClothSelector />
{:else}
	<ClothEvaluator />
{/if}