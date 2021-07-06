<script>
    export let data

    import {Card, CardTitle, CardSubtitle} from 'svelte-materialify/src'
</script>

<Card style="max-width:350px; margin: 15px 10px;">
    <img style="max-width: 100%;" src={data.filename} alt="">
    <CardTitle style="word-break: normal;">{data.description}</CardTitle>
    <CardSubtitle>Mean : {data.predicted_thermal_sensation.mean.toPrecision(4)}</CardSubtitle>
    <slot name="bottom"></slot>
</Card>