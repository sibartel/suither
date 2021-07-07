<style>
    img.dark-theme {
        filter: invert(83%) sepia(0%) saturate(0%) hue-rotate(186deg) brightness(91%) contrast(93%);
    }

    :global(label.s-slider__label:empty) {
        margin-right: 0 !important;
    }
</style>

<script>
    export let data

    import { Slider, Card, CardTitle, CardSubtitle, CardText } from 'svelte-materialify/src'
    
	import { dataStore } from '../stores/dataStore.js'

    const emojis = ['❄️ ❄️ ❄️ ', '❄️ ❄️ ', '❄️ ', '☁️', '🔥', '🔥🔥', '🔥🔥🔥'];
  	const thermalThumb = (v) => emojis[Math.min(Math.floor((v + 300) * 7 / 600), 6)];
    
  	const scaleThumb = (v) => (v / 100).toFixed(1);

    $: mean = data.predicted_thermal_sensation.mean.toFixed(1)
    $: min = data.predicted_thermal_sensation.min.toFixed(1)
    $: max = data.predicted_thermal_sensation.max.toFixed(1)
</script>

<Card style="max-width: 350px; margin: 15px 10px;">
    <img class="{$dataStore.theme === 'dark' ? 'dark-theme' : ''}" style="max-width: 100%;" src={`${data.file_identifier}-350px.png`} alt="">
    <CardTitle style="word-break: normal;">{data.description}</CardTitle>
    <CardSubtitle>
        MSE : {data.predicted_thermal_sensation.mse.toFixed(4)}
    </CardSubtitle>
    <CardText style="padding-bottom: 0;">
        <div style="margin-top: 40px">
            <Slider value={[min * 100, mean * 100, max * 100]}
                thumb={[false, scaleThumb, false]} connect={[false, true, true, false]}
                min={-300} max={300} persistentThumb readonly>
                <span slot="prepend-outer">
                    ❄️
                </span>
                <span slot="append-outer">
                    🔥
                </span>
            </Slider>
        </div>
    </CardText>
    <slot name="bottom"></slot>
</Card>