<script context="module">
	import MoneyCalcuator from "@fluentui/svg-icons/icons/money_calculator_20_filled.svg?raw"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		return {
			stuff: {
				name: "Robux Calcuator",
				description: "Original algorithm from Amourousity.",
				icon: MoneyCalcuator,
			},
		}
	}
</script>

<script>
	let Robux = 100
	$: Tax = Math.floor(1e3 * (1 - Math.floor(Robux * 0.7 + 0.5) / Robux)) / 10
	import { NumberBox } from "fluent-svelte"
</script>

<section>
	<label for="robux">Earnings before tax:</label>
	<NumberBox id="robux" bind:value={Robux} required />
</section>
<br />
Rounded tax percent: {Tax}%<br />
You {#if Tax > 30}
	lose: {Math.abs(30 - Tax).toFixed(2)}%
{:else if Tax < 30}
	gain: {Math.abs(30 - Tax).toFixed(2)}%
{:else if Tax == 30}
	break even
{/if}<br />
Earnings after tax: {Math.floor(Robux * 0.7 + 0.5)}<br />
Price adjusted for tax: {Math.floor(Robux / 0.7 + 0.5)}

<style>
	section {
		display: flex;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
	label {
		flex-grow: 1;
		width: max-content;
		white-space: pre;
	}
</style>
