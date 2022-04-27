<script context="module">
	import Computer from "@fluentui/svg-icons/icons/desktop_pulse_20_filled.svg?raw"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		return {
			stuff: {
				name: "Device Info",
				description: "Get (some) information about your device",
				icon: Computer,
			},
		}
	}
</script>

<script>
	import Display from "@fluentui/svg-icons/icons/desktop_20_filled.svg?raw"
	import Info from "@fluentui/svg-icons/icons/info_20_filled.svg?raw"
	import { InfoBar } from "fluent-svelte"
	import { browser } from "$app/env"
	function simplify_ratio(a, b) {
		const gcd = (a, b) => (b ? gcd(b, a % b) : a)
		return `${a / gcd(a, b)}:${b / gcd(a, b)}`
	}

	const extensions = []

	if (browser) {
		if ("domainBypass" in globalThis) {
			extensions.push("FastForward / Universal Bypass")
		}
		if ("web3" in globalThis || "ethereum" in globalThis) {
			extensions.push("Ethereum wallet")
		}
		if ('__REACT_DEVTOOLS_GLOBAL_HOOK__' in globalThis) {
			extensions.push("React DevTools")
		}
		if (
			Array.from(document.querySelectorAll("style")).some(el => el.classList.contains("darkreader"))
		) {
			extensions.push("Dark Reader")
		}
		if (
			Array.from(document.querySelectorAll("style")).some(el => el.classList.contains("stylus"))
		) {
			extensions.push("Stylus")
		}
		if (navigator.share.toString().startsWith('(data)')) {
			extensions.push("Plasma Browser Integration")
		}
	}
</script>

{#if browser}
	<h2>{@html Display} Display</h2>
	<div class="screen" style=" aspect-ratio: {globalThis.screen.width} / {globalThis.screen.height}">
		<span>
			{globalThis.screen.width}x{globalThis.screen.height} ({simplify_ratio(
				globalThis.screen.width,
				globalThis.screen.height
			)})
		</span>
		<span>Color Depth: {globalThis.screen.colorDepth}</span>
		<span>Pixel Depth: {globalThis.screen.pixelDepth}</span>
		<span>DPI: {globalThis.devicePixelRatio}</span>
	</div>
	<h2>
		<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M13 2a2.47 2.47 0 0 1 2.47 2.47l-.001.53H19a1 1 0 0 1 1 1l-.001 3.499-1.53.001a2.47 2.47 0 0 0-2.464 2.307L16 11.97v.06a2.47 2.47 0 0 0 2.307 2.465l.163.005 1.529-.001.001 3.504a1 1 0 0 1-1 1l-3.531-.001v.528a2.47 2.47 0 1 1-4.939 0v-.528H7a1 1 0 0 1-1-1l-.001-3.531h-.53a2.47 2.47 0 0 1 0-4.94H6L6 6a1 1 0 0 1 1-1h3.53v-.53A2.47 2.47 0 0 1 13 2Z" /></svg>
		Extensions
	</h2>
	{#each extensions as extension}
		<li>{extension}</li>
	{:else}
		<InfoBar
			title="No extensions found."
			message="We can detect Ethereum wallets, Dark Reader, Stylus, React DevTools, Plasma Browser Integration, and FastFoward / Universal Bypass."
			closable={false} />
	{/each}

	<h2>{@html Info} Other</h2>
	{#if navigator.deviceMemory}
		<li>RAM: At least {navigator.deviceMemory} GB</li>
	{/if}
	<li>
		Languages:
		<ul>
			{#each navigator.languages as language}
				{@const resolver = new Intl.DisplayNames(navigator.language, { type: "language" })}
				<li class:primary={language === navigator.language}>{resolver.of(language)}</li>
			{/each}
		</ul>
	</li>
	{#if navigator.hardwareConcurrency}
		<li>Cores: At most {navigator.hardwareConcurrency}</li>
	{/if}
{:else}
	<InfoBar
		title="JavaScript required"
		message="You need to enable JavaScript to see device info."
		severity="caution"
		closable={false} />
{/if}

<style>
	.primary::after {
		content: " (primary)";
		font-weight: bold;
	}
	h2 {
		display: flex;
		/* justify-content: center; */
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
	.screen {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1ch;
		color: var(--fds-text-on-accent-primary);
		font-weight: bold;
		flex-direction: column;
		background: linear-gradient(
			to right,
			var(--fds-accent-default),
			var(--fds-accent-secondary),
			var(--fds-accent-tertiary)
		);
		border: 5px solid var(--fds-text-primary);
		border-radius: 1em;
	}
</style>
