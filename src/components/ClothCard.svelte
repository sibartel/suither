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

    import { Button, Icon, Divider, Slider, Card, CardTitle, CardSubtitle, CardText, CardActions } from 'svelte-materialify/src'
    import { mdiChevronDown } from '@mdi/js'
    import { slide } from 'svelte/transition'
    import clone from 'just-clone'

	import { dataStore } from '../stores/dataStore.js'
    
  	const scaleThumb = (v) => (v / 100).toFixed(1)

    let working_data = clone(data)

    let mean = working_data.predicted_thermal_sensation.mean.toFixed(1)
    let min = working_data.predicted_thermal_sensation.min.toFixed(1)
    let max = working_data.predicted_thermal_sensation.max.toFixed(1)

    let detailed_view_enabled = false
</script>

<Card style="max-width: 350px; margin: 15px 10px;">
    <img class="{$dataStore.theme === 'dark' ? 'dark-theme' : ''}" style="max-width: 100%;" src={`${data.file_identifier}-350px.png`} alt="">
    <CardTitle style="word-break: normal;">{working_data.description}</CardTitle>
    <CardSubtitle>
        MSE : {working_data.predicted_thermal_sensation.mse.toFixed(4)}
    </CardSubtitle>
    <CardText style="padding-bottom: 0;">
        <div class="mt-10">
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
    <CardActions>
        <div class="flex-grow-1 mr-2">
            <slot name="button"></slot>
        </div>
        <Button text fab size="small" class="ml-auto" on:click={() => {detailed_view_enabled = !detailed_view_enabled}}>
          <Icon path={mdiChevronDown} rotate={detailed_view_enabled ? 180 : 0} />
        </Button>
    </CardActions>
    {#if detailed_view_enabled}
        <div transition:slide="{{duration: 200}}">
            <Divider />
            <div class="pl-4 pr-4 pt-2 pb-2">
                {#each working_data.predicted_thermal_sensation.hourly as hour}
                    <span class="text--secondary">
                        {new Date(parseInt(hour.dt) * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} {hour.description !== 'base' ? ' - ' + hour.description : ''}
                    </span>
                    <div class="mt-10">
                        <Slider value={hour.predicted_thermal_sensation * 100} connect={false, false}
                            thumb={scaleThumb} min={-300} max={300} persistentThumb readonly>
                            <span slot="prepend-outer">
                                ❄️
                            </span>
                            <span slot="append-outer">
                                🔥
                            </span>
                        </Slider>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</Card>