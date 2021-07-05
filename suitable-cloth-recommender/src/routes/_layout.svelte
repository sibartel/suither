<script>
	import {MaterialApp, AppBar, Menu, ListItem, Button, Icon} from 'svelte-materialify/src'
	import { mdiDotsVertical } from '@mdi/js'
</script>

<MaterialApp theme="light">
	<AppBar>
		<span slot="title">Suither</span>
		<div style="flex-grow:1" />
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

	<slot />
</MaterialApp> 