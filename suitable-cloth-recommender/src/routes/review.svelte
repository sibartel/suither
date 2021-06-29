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
	import {Slider, Divider} from 'svelte-materialify'
	import weather from "../logic/weather-api.mjs"
/* 	import {option} from './pick2.svelte'
 */
	let min = -300;
	let max = 300;

	

	let reviews = [
		{time: '9:40', feeling: -210, id: 0},
		{time: '11:30', feeling: 100, id: 1},
		{time: '12:59', feeling: 10, id: 2},
	]

	let time = '16:40';
	let feeling = 0;
	let id = 2;


	 function handleClick() {
	}

	const addReview = () => {
		id++;
		reviews = reviews.concat({time, feeling, id});
		console.log(reviews);
	}

	const deleteReview = (id) => {
		reviews = reviews.filter((review) => review.id != id)
	}

	let temp = 0;
	weather.get_weather_current().then(forecast => temp = forecast.feels_like);
</script>

<svelte:head>
	<title>Review</title>
 </svelte:head>

<h1>Review todays outfit</h1>

<p>Todays weather 🌤 {temp}°C 🌧 10%
</p>


<p>	
	<img src="longlong.jpg" alt=""> 
</p>

<p>
	Time
	<input bind:value={time}>
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