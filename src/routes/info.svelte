<script>
  import { ProgressCircular } from 'svelte-materialify/src'
  import Recommender from '../logic/recommender.mjs'

  let promise_status = Recommender.get().then(async r => await r.model_status(), console.error)
</script>

<svelte:head>
	<title>Info</title>
</svelte:head>

{#await promise_status}
	<ProgressCircular indeterminate color="primary" />
{:then status}
	<h4>User Model</h4>

	<pre>
		<code style="display:block; white-space:pre-wrap">
			{JSON.stringify(status, null, 2)}
		</code>
	</pre>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}