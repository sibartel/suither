<script>
    import { Slider } from 'svelte-materialify/src'

    export let thermal_sensation
    export const init = 0
    
    let slider_value = init

    $: thermal_sensation = slider_value
</script>

<Slider step={1} min={-3} max={3} connect={false, false} thumb={() => thermal_sensation} bind:value={slider_value} {...$$restProps}>
    <span slot="prepend-outer">
        ❄️
    </span>
    <span slot="append-outer">
        🔥
    </span>
</Slider>