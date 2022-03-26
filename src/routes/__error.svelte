<script context="module">
	/**
	 * @type {import('@sveltejs/kit').ErrorLoad}
	 */
	export function load({ error, status, routeId }) {
		return {
			props: {
				status,
				message: error,
				routeId,
			},
		}
	}
</script>

<script>
	import { InfoBar, InfoBadge } from "fluent-svelte"
	import { mode } from "$app/env"
	/** @type {number} */
	export let status
	/** @type {Error} */
	export let message
	export let routeId
</script>

<svelte:head>
	<title>{status}: {message.name} - trolled!</title>
</svelte:head>

<h1 class="big">
	<img src="/favicon.svg" alt="trollface owned" />
</h1>
<InfoBar closable={false} title={status.toString()} severity="critical">
	{#if routeId}
		{routeId} >
	{/if}{message.name}
	<InfoBadge style="float: right" severity="critical">{mode}</InfoBadge>
</InfoBar>
<pre>{message.stack}</pre>

<style>
	.big {
		pointer-events: none;
		user-select: none;
		z-index: -1;
		font-size: 30vw;
		position: absolute;
		top: -15vw;
		left: -5vw;
		font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
		opacity: 0.5;
	}
</style>
