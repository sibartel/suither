<script>
	import { goto } from '@sapper/app'
	import { Alert, Icon, Button, ProgressCircular } from 'svelte-materialify/src'
	import { mdiAlert } from '@mdi/js'
	
	import { dataStore } from '../stores/dataStore.js'
	import ClothSelector from '../components/ClothSelector.svelte'
	import ClothEvaluator from '../components/ClothEvaluator.svelte'
	import Recommender from '../logic/recommender.mjs'

	let promise_status = Recommender.get().then(async r => await r.model_status(), console.error)
</script>

<svelte:head>
	<title>Suither</title>
</svelte:head>

{#await promise_status}
	<ProgressCircular indeterminate color="primary" />
{:then status}
	{#if !status.initialized}
		<h4>Welcome to Suither</h4>
		<Button class="green white-text" on:click={() => goto('settings')}>
			Getting Started
		</Button>
	{:else if !$dataStore.current_cloth_set}
		<ClothSelector />
	{:else}
		<ClothEvaluator />
	{/if}
{:catch error}
	<Alert class="error-text" dense>
		<div slot="icon">
			<Icon path={mdiAlert} />
		</div>
		{error.message}
	</Alert>
{/await}