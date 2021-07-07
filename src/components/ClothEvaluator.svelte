<style>
	input {
		background-color: rgb(255, 255, 255);
	}
	p {
		max-width: 400px;
	}
</style>

<script>	
	import { Divider, Slider, Button } from 'svelte-materialify/src'
	import { dataStore } from '../stores/dataStore.js'
	import ClothCard from '../components/ClothCard.svelte'

	// these automatically update when `time`
	// changes, because of the `$:` prefix
	let ctime = new Date();
	$: hours = ctime.getHours();
	$: minutes = ctime.getMinutes();
	$: current_time = hours + ":" + zeroFill(minutes, 2);

	function zeroFill( number, width ){
  		width -= number.toString().length;
  		if ( width > 0){
    	return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  		}
  		return number + ""; // always return a string
	}

	let reviews = $dataStore.reviews;

	let feeling = 0;
	let id = 0;


	function submitFeedback() {
	}

	const addReview = () => {
		id++;
		reviews = reviews.concat({time: current_time, feeling, id});
		console.log(reviews);
		dataStore.update(current => {
			current.reviews = reviews;
			return current;
		}) 
	}

	const deleteReview = (id) => {
		reviews = reviews.filter((review) => review.id != id)
		dataStore.update(current => {
			current.reviews = reviews;
			return current;
		}) 
	}
</script>

<h4>Review todays outfit</h4>

<ClothCard data={$dataStore.current_cloth_set}>
	<Button slot="button" class="red white-text" block on:click={() => {
		$dataStore.current_cloth_set = null
		$dataStore.reviews = []
	}}>
		Dismiss Outfit
	</Button>
</ClothCard>

<p>
	Time
	<input bind:value={current_time}>
	<button on:click={addReview}>
		Add Review
	</button>
	<Slider min={-300} max={300} bind:value={feeling}>
		<span slot="prepend-outer">
			❄️
		</span>
		<span slot="append-outer">
			🔥
		  </span>
	</Slider>
</p>

<Divider />

<h4>Todays Reviews:</h4>

{#each $dataStore.reviews as review}
	<div>
		<p>Time: {review.time} <button on:click={() => deleteReview(review.id)}>❌</button>
			<Slider min={-300} max={300} readonly value={review.feeling}> 
				<span slot="prepend-outer">
					❄️
				</span>
				<span slot="append-outer">
					🔥
				  </span>
			</Slider>
			
		</p>
		
	</div>	
{:else}
	<p>There are no reviews at the moment.</p>	
{/each}

<Button on:click={submitFeedback}>
	Submit Feedback
</Button>