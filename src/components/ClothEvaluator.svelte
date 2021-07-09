<style>
	fieldset {
		border: none;
	}

	.fields {
		margin-left: 20px;
	}
</style>

<script>	
	import { Divider, Slider, Button, ProgressCircular, Alert, Icon, Radio } from 'svelte-materialify/src'
	import { mdiCheck, mdiAlert } from '@mdi/js'
    import clone from 'just-clone'

	import { dataStore } from '../stores/dataStore.js'
	import ClothCard from '../components/ClothCard.svelte'
	import Recommender from '../logic/recommender.mjs'

	let current_cloth_set = clone($dataStore.current_cloth_set)

	let variant_insulation = $dataStore.current_cloth_set.insulation
	let current_activity = $dataStore.recommender_settings.activity
	let thermal_sensation = 0

	let feedback_status = null
	let pending = false

	const add_feedback = () => {
		pending = true
		feedback_status = Recommender.get().then(async r => {
			await r.live_feedback(parseFloat(variant_insulation), parseFloat(current_activity), parseFloat(thermal_sensation) / 100)
			pending = false
		})
	}
</script>

<h4>Current outfit</h4>

<ClothCard data={current_cloth_set}>
	<Button slot="button" class="primary-color black-text" block on:click={() => {
		$dataStore.current_cloth_set = null
		$dataStore.reviews = []
	}}>
		Choose Another Outfit
	</Button>
</ClothCard>

<Divider class="mt-6 mb-4" />

<h4>Provide Feedback</h4>

<div>
	<fieldset>
		<legend>What variant are you wearing right now?</legend>
		<div class="fields">
			<Radio bind:group={variant_insulation} disabled={pending || undefined} value={current_cloth_set.insulation}>Base</Radio>
			{#each current_cloth_set.variants as variant}
				<Radio bind:group={variant_insulation} disabled={pending || undefined} value={variant.insulation}>{variant.description}</Radio>
			{/each}
		</div>
	</fieldset>

	<fieldset>
		<legend>How physically active are you right now?</legend>
		<div class="fields">
			<Slider min={45} max={400} disabled={pending || undefined} bind:value={current_activity}>
				<span slot="prepend-outer" class="text--secondary">
					Relax
				</span>
				<span slot="append-outer" class="text--secondary">
					Heavy Sport
				</span>
			</Slider>
		</div>
	</fieldset>

	<fieldset>
		<legend>How warm or cold is you right now?</legend>
		<div class="fields">
			<Slider min={-300} max={300} connect={false, false} disabled={pending || undefined} bind:value={thermal_sensation}>
				<span slot="prepend-outer">
					❄️
				</span>
				<span slot="append-outer">
					🔥
				</span>
			</Slider>
		</div>
	</fieldset>

	<Button class="primary-color black-text" disabled={pending || undefined} on:click={add_feedback}>
		Add Feedback
	</Button>
</div>

<div class="mt-10 mb-10 d-flex justify-center">
	{#if feedback_status}
		{#await feedback_status}
			<ProgressCircular indeterminate color="primary" />
		{:then}
			<Alert class="success-color" dense>
				<div slot="icon">
				<Icon path={mdiCheck} />
				</div>
				Sucessfully added your feedback data. The model was trained and your
				feedback is taken into account from now on.
			</Alert>
		{:catch error}
			<Alert class="error-text" dense>
				<div slot="icon">
				<Icon path={mdiAlert} />
				</div>
				{error.message}
			</Alert>
		{/await}
	{/if}
</div>