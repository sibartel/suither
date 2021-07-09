<script>
    import { Slider } from 'svelte-materialify/src'

    export let thermal_sensation
    export let init = 0
    export let min = -3
    export let max = 3
    export let step = 1
    
    let slider_value = init / step

    $: thermal_sensation = slider_value * step
</script>

<Slider min={min / step} max={max / step} step={1} connect={false, false} thumb={() => thermal_sensation} bind:value={slider_value} {...$$restProps}>
    <span slot="prepend-outer">
        ❄️
    </span>
    <span slot="append-outer">
        🔥
    </span>
</Slider>