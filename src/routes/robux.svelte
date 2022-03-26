<script>
	export let Robux = 100
	let Tax = Math.floor(1e3 * (1 - Math.floor(Robux * 0.7 + 0.5) / Robux)) / 10
	import { TextBox } from "fluent-svelte";
</script>

<h1>Robux Calcuator</h1>
<small>Original algorithm from Amourousity.</small>
<!-- 

  print(("Earnings before tax:    %.0f\nRounded tax percent:    %.1f%%\nYou%s               %s\nEarnings after tax:     %.0f\nPrice adjusted for tax: %.0f"):format(Robux,Tax,Tax > 30 and " lose:" or Tax < 30 and " gain:" or ":     ",Tax == 30 and "break even" or math.abs(30-Tax).."%",math.floor(Robux*.7+.5),math.floor(Robux/.7+.5)))
 -->

Earnings before tax: {Robux}<br />
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

<TextBox type=number bind:value={Robux} />

<svelte:head>
	<title>Robux Calcuator</title>
	<meta name="description" content="Adjust your game passes for tax." />
</svelte:head>