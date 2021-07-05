<style>
	img{
		max-width: 200px;
		margin: 0 0 1em 0;
	}
	input {
		background-color: rgb(255, 255, 255);
	}
	p {
		max-width: 400px;
	}
</style>

<script>	
	import {Slider} from 'svelte-materialify';
	import WeatherBar from '../components/WeatherBar.svelte';
	import { dataStore } from "../stores/dataStore.js"
	import { onDestroy } from "svelte";

	let data;
	const unsubscribe = dataStore.subscribe(value => {
		data = value;
	});
	onDestroy(unsubscribe);


	let min = -300;
	let max = 300;

	let ctime = new Date();

	// these automatically update when `time`
	// changes, because of the `$:` prefix
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

	let reviews = data.reviews;

	let feeling = 0;
	let id = 0;


	 function handleClick() {
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

<svelte:head>
	<title>Review</title>
 </svelte:head>

<h1>Review todays outfit</h1>

<WeatherBar/>


<p>	
	<img src={data.outfit_picture} alt=""> 
</p>

<p>
	Time
	<input bind:value={current_time}>
	<button on:click={addReview}>
		Add Review
	</button>
	<Slider {min} {max} bind:value={feeling}>
		<span slot="prepend-outer">
			❄️
		</span>
		<span slot="append-outer">
			🔥
		  </span>
	</Slider>
</p>

<!-- <Divider inset /> -->
<h3>Todays Reviews:</h3>


{#each reviews as review}
	<div>
		<p>Time: {review.time} <button on:click={() => deleteReview(review.id)}>❌</button>
			<Slider {min} {max} readonly value={review.feeling}> 
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
	<p>There are no reviews at this moment.</p>	
{/each}




<button on:click={handleClick}>
	Confirm
</button>