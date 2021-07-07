<style>
    img.dark-theme {
        filter: invert(83%) sepia(0%) saturate(0%) hue-rotate(186deg) brightness(91%) contrast(93%);
    }
</style>

<script>
    export let data

    import {Card, CardTitle, CardSubtitle} from 'svelte-materialify/src'
    
	import { dataStore } from '../stores/dataStore.js'
</script>

<Card style="max-width: 350px; margin: 15px 10px;">
    <img class="{$dataStore.theme === 'dark' ? 'dark-theme' : ''}" style="max-width: 100%;" src={`${data.file_identifier}-350px.png`} alt="">
    <CardTitle style="word-break: normal;">{data.description}</CardTitle>
    <CardSubtitle>
        MSE : {data.predicted_thermal_sensation.mse.toFixed(4)}<br />
        Mean : {data.predicted_thermal_sensation.mean.toFixed(4)}<br />
        Min : {data.predicted_thermal_sensation.min.toFixed(4)}<br />
        Max : {data.predicted_thermal_sensation.max.toFixed(4)}
    </CardSubtitle>
    <slot name="bottom"></slot>
</Card>