<script>
    export let data

    import {Card, CardTitle, CardSubtitle} from 'svelte-materialify/src'
</script>

<Card style="max-width:350px; margin: 15px 10px;">
    <img style="max-width: 100%;" src={data.filename} alt="">
    <CardTitle style="word-break: normal;">{data.description}</CardTitle>
    <CardSubtitle>
        MSE : {data.predicted_thermal_sensation.mse.toFixed(4)}<br />
        Mean : {data.predicted_thermal_sensation.mean.toFixed(4)}<br />
        Min : {data.predicted_thermal_sensation.min.toFixed(4)}<br />
        Max : {data.predicted_thermal_sensation.max.toFixed(4)}
    </CardSubtitle>
    <slot name="bottom"></slot>
</Card>