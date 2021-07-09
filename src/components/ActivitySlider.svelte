<script>
    import { Slider } from 'svelte-materialify/src'

    import activities from '../logic/activities.mjs'

    export let activity_level
    export let activity_index = 0
    
    let activity_description = ''

    $: {
        activity_description = activities[activity_index][0]
        activity_level = activities[activity_index][1]
    }
</script>

<Slider step={1} min={0} max={activities.length - 1} inverseLabel bind:value={activity_index} {...$$restProps}>
    <span style="display: inline-block; min-width: 135px; text-align: right;">{activity_description}</span>
</Slider>