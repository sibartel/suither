<svelte:head>
	<link href='https://fonts.googleapis.com/css?family=Oleo Script' rel='stylesheet'>
</svelte:head>

<style>
	.main {
		padding: 5px 10px;
	}

	.nav-link {
		text-decoration: none;
		color: unset;
	}

	.text-logo {
		font-family: 'Oleo Script';
		font-size: 30px;
	}

	:global(.s-list-item__title) {
		overflow: unset;
	}
</style>

<script>
	import { onMount } from 'svelte'
	import { goto } from '@sapper/app'
	import { MaterialApp, AppBar, Menu, ListItem, Button, Icon} from 'svelte-materialify/src'
	import { mdiDotsVertical } from '@mdi/js'
	import WeatherBar from '../components/WeatherBar.svelte'
	import { dataStore } from '../stores/dataStore.js'

	let system_theme = 'light'
	onMount(() => {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			system_theme = e.matches ? 'dark' : 'light'
		})
	})

	$: theme = $dataStore.theme === 'system' ? system_theme : $dataStore.theme
</script>

<MaterialApp theme="{theme}">
	<AppBar>
		<a class="text-logo nav-link" slot="title" href=".">Suither</a>
		<div style="flex-grow:1" />
		<span><WeatherBar /></span>
		<Menu right>
		  <div slot="activator">
			<Button fab depressed>
			  <Icon path={mdiDotsVertical} />
			</Button>
		  </div>
		  <ListItem on:click={() => goto('settings')}>Settings</ListItem>
		  <ListItem on:click={() => goto('info')}>Info for nerds</ListItem>
		  <ListItem on:click={() => goto('about')}>About</ListItem>
		</Menu>
	</AppBar>

	<div class="main">
		<slot />
	</div>
</MaterialApp> 