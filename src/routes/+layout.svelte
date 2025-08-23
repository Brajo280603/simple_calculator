<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	import { App } from 'konsta/svelte';

	import {theme} from '../stores.js'

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<App theme = {$theme}>
	{@render children?.()}
</App>

