<script>
	export let Robux = 100
	let Tax = Math.floor(1e3 * (1 - Math.floor(Robux * 0.7 + 0.5) / Robux)) / 10
	import { TextBox } from "fluent-svelte"
</script>

<h1>Robux Calcuator</h1>
<small>Original algorithm from Amourousity.</small>
<section><span>Earnings before tax:</span> <TextBox type="number" bind:value={Robux} /></section>
<br />
Rounded tax percent: {Tax}%<br />
You{#if Tax > 30}
	lose: {Math.abs(30 - Tax)}%
{/if}
{#if Tax < 30}
	gain: {Math.abs(30 - Tax)}%
{/if}
{#if Tax == 30}
	break even
{/if}<br />
Earnings after tax: {Math.floor(Robux * 0.7 + 0.5)}<br />
Price adjusted for tax: {Math.floor(Robux / 0.7 + 0.5)}

<svelte:head>
	<title>Robux Calcuator</title>
	<meta name="description" content="Adjust your game passes for tax." />
</svelte:head>

<style>
	section {
		display: flex;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
	span {
		flex-grow: 1;
		width: max-content;
		white-space: pre;
	}
</style>
