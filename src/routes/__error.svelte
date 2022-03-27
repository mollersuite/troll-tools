<script context="module">
	/**
	 * @type {import('@sveltejs/kit').ErrorLoad}
	 */
	export function load({ error, status, routeId }) {
		return {
			props: {
				status,
				error,
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
	export let error
	export let routeId
</script>

<svelte:head>
	<title>{status}: {error.name} - trolled!</title>
</svelte:head>

<img class="big" src="/favicon.svg" alt="trollface owned" />
<InfoBar closable={false} title={status.toString()} severity="critical">
	{#if routeId}
		{routeId} >
	{/if}{error.name}
	<InfoBadge style="float: right" severity="critical">{mode}</InfoBadge>
</InfoBar>
<pre>{error.stack}</pre>

<style>
	.big {
		pointer-events: none;
		user-select: none;
		z-index: -1;
		width: 30vw;
		position: absolute;
		left: -5vw;
		font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
		opacity: 0.5;
	}
</style>
