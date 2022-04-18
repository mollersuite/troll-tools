<script context="module">
	import Font from "@fluentui/svg-icons/icons/text_font_20_filled.svg?raw"
	import { TextBox } from "fluent-svelte"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		return {
			stuff: {
				name: 'Unicode "Font" Generator',
				description: "make your tweets look cool at the expense of screen reader compatibility",
				icon: Font,
			},
		}
	}
</script>

<script>
	import { browser } from "$app/env"
	import { Button, Expander, InfoBar, Slider, ToggleSwitch } from "fluent-svelte"
	import Accessibility from "@fluentui/svg-icons/icons/accessibility_20_filled.svg?raw"
	import zalgo from "$lib/zalgo"

	/** @param {string} text @param {HTMLElement} [paragraph] */
	function say(text, paragraph) {
		const voice = random(speechSynthesis.getVoices().filter(voice => voice.lang.startsWith("en-")))
		let handle
		return new Promise(resolve => {
			function check() {
				if (speechSynthesis.speaking) {
					handle = requestAnimationFrame(check)
				} else {
					cancelAnimationFrame(handle)
					resolve()
				}
			}
			const utter = new SpeechSynthesisUtterance(text)
			utter.voice = voice
			if (paragraph) {
				paragraph.innerText = ""
			}
			utter.addEventListener("boundary", function (event) {
				if (paragraph) {
					paragraph.innerText = text.substring(0, event.charIndex + event.charLength)
				}
			})
			speechSynthesis.speak(utter)
			check()
		})
	}

	let value = ""
	/** @type {<Type>(arr: Type[]) => Type} */
	const random = arr => arr[Math.floor(Math.random() * arr.length)]

	let zalgo_up = true
	let zalgo_middle = true
	let zalgo_down = true
	let zalgo_intensity = 1
	$: zalgo_value = zalgo(value, {
		up: zalgo_up,
		middle: zalgo_middle,
		down: zalgo_down,
		intensity: zalgo_intensity,
	})
</script>

{#if globalThis.speechSynthesis}
	<Expander>
		What do you mean "screen reader compatibility?"
		<svelte:fragment slot="icon">
			{@html Accessibility}
		</svelte:fragment>
		<svelte:fragment slot="content">
			<p>Click to listen.</p>
			<nav>
				<Button on:click={() => say("h̓eͩ ͧc͂o̼m̟ẻs̃")}>"h̓eͩ ͧc͂o̼m̟ẻs̃"</Button>
				<Button on:click={() => say("he comes")}>"he comes"</Button>
			</nav>
			<p>
				Notice how the screen reader spells out the Zalgo text? This also happens with the Underline
				"font."
			</p>
			<nav>
				<Button on:click={() => say("t̲h̲i̲s̲ ̲t̲e̲x̲t̲ ̲i̲s̲ ̲u̲n̲d̲e̲r̲l̲i̲n̲e̲d̲!̲")}>"t̲h̲i̲s̲ ̲t̲e̲x̲t̲ ̲i̲s̲ ̲u̲n̲d̲e̲r̲l̲i̲n̲e̲d̲!̲"</Button>
				<Button on:click={() => say("this text is underlined!")}>"this text is underlined!"</Button>
			</nav>
		</svelte:fragment>
	</Expander>
	<br />
{/if}
<TextBox bind:value aria-label="Text to convert" />
{#if !browser}
	<InfoBar
		severity="caution"
		title="JavaScript required"
		message="This tool currently requires JavaScript to be enabled. We might fix this later."
		closable={false} />
{/if}
{#if value}
	<h2>Zalgo</h2>
	<nav>
		<Slider bind:value={zalgo_intensity} min={1} max={10} suffix=" characters per character" />
		<ToggleSwitch bind:checked={zalgo_up}>Up</ToggleSwitch>
		<ToggleSwitch bind:checked={zalgo_middle}>Middle</ToggleSwitch>
		<ToggleSwitch bind:checked={zalgo_down}>Down</ToggleSwitch>
	</nav>
	{zalgo_value}
	<h2>Underline</h2>
	{[...value].map(char => char + "\u0332").join("")}
	<h2>Strikethrough</h2>
	{[...value].map(char => char + "\u0336").join("")}
	<h2>URL encoded</h2>
	{value.split('').map(a=>'%' + a.charCodeAt(0).toString(16).toUpperCase()).join('')}
	<h2>HTML entities</h2>
	{[...value].map(a=>'&#' + a.codePointAt(0).toString(10).toUpperCase() + ';').join('')}
{:else}
	<InfoBar
		closable={false}
		title="Type some text!"
		message="We can convert your text to Zalgo, Underline, URL encoded, HTML entities, and Strikethrough." />
{/if}

<style>
	nav {
		display: flex;
		justify-content: stretch;
		align-items: stretch;
		gap: 1ch;
		flex-direction: row;
	}
	nav > :global(*) {
		flex-grow: 1;
	}
</style>
