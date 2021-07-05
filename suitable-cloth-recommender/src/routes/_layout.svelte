<script>
	import { MaterialApp, AppBar, Menu, ListItem, Button, Icon} from 'svelte-materialify/src'
	import { mdiDotsVertical } from '@mdi/js'
	import WeatherBar from '../components/WeatherBar.svelte'
</script>

<style>
	.main {
		padding: 5px 10px;
	}
</style>

<MaterialApp theme="light">
	<AppBar>
		<span slot="title">Suither</span>
		<div style="flex-grow:1" />
		<span><WeatherBar /></span>
		<Menu right>
		  <div slot="activator">
			<Button fab depressed>
			  <Icon path={mdiDotsVertical} />
			</Button>
		  </div>
		  <ListItem>Reset model</ListItem>
		  <ListItem>Infos for nerds</ListItem>
		  <ListItem>About</ListItem>
		</Menu>
	</AppBar>

	<div class="main">
		<slot />
	</div>
</MaterialApp> 