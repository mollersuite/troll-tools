<script context="module">
	import Tool from "@fluentui/svg-icons/icons/scan_text_20_filled.svg?raw"
	import { ListItem } from "fluent-svelte"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		return {
			stuff: {
				name: "Codepoints",
				description: "See the Unicode codepoints inside text",
				icon: Tool,
			},
		}
	}
</script>

<script>
	import { InfoBar } from "fluent-svelte"
	let value = ""
</script>

<InfoBar title="See also"><a href="/tools/font">Unicode "Font" Generator</a></InfoBar>
<textarea bind:value />
{#each Array.from(value) as codepoint}
	{@const fancy = codepoint.codePointAt().toString(16).toUpperCase().padStart(4, "0")}
	<ListItem on:click={() => navigator.clipboard.writeText(codepoint)}
		>U+{fancy} = <code>{codepoint}</code></ListItem>
{/each}
