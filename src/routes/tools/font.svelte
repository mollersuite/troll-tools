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
	import { Button, Expander, InfoBar, Slider } from "fluent-svelte"

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
	const zalgo = {
		up: [
			768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786,
			787, 788, 789, 794, 795, 829, 830, 831, 832, 833, 834, 835, 836, 838, 842, 843, 844, 848, 849,
			850, 855, 856, 859, 861, 862, 864, 865, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877,
			878, 879,
		],
		middle: [820, 821, 822, 823, 824],
		down: [
			790, 791, 792, 793, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810,
			811, 812, 813, 814, 815, 816, 817, 818, 819, 825, 826, 827, 828, 837, 839, 840, 841, 845, 846,
			851, 852, 853, 854, 857, 858, 860, 863, 866,
		],
	}
	/** @type {<Type>(arr: Type[]) => Type} */
	const random = arr => arr[Math.floor(Math.random() * arr.length)]

	const zalgo_chars = [...zalgo.up, ...zalgo.middle, ...zalgo.down]
	let zalgo_intensity = 1
</script>

{#if globalThis.speechSynthesis}
	<Expander>
		What do you mean "screen reader compatibility?"
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
<TextBox autofocus bind:value aria-label="Text to convert" />
{#if !browser}
	<InfoBar
		severity="caution"
		title="JavaScript required"
		message="This tool currently requires JavaScript to be enabled. We might fix this later."
		closable={false} />
{/if}
{#if value}
	<h2>Zalgo</h2>
	<Slider bind:value={zalgo_intensity} min={1} max={10} suffix=" characters per character" />
	{[...value]
		.map(
			char =>
				char +
				Array.from({ length: zalgo_intensity }, () =>
					String.fromCharCode(random(zalgo_chars))
				).join("")
		)
		.join("")}
	<h2>Underline</h2>
	{[...value].map(char => char + "\u0332").join("")}
	<h2>Strikethrough</h2>
	{[...value].map(char => char + "\u0336").join("")}
{:else}
	<InfoBar
		closable={false}
		title="Type some text!"
		message="We can convert your text to Zalgo, Underline, and Strikethrough." />
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
