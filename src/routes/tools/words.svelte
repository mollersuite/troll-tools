<script context="module">
	import Words from "@fluentui/svg-icons/icons/text_word_count_20_filled.svg?raw"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ props }) {
		return {
			stuff: {
				name: "Word Search",
				description: "Amourousity asked for it.",
				icon: Words,
			},
			props,
		}
	}
</script>

<script>
	import { ListItem, TextBox } from "fluent-svelte"

	export let words = []
	let value = ""
	let found = []
	function search() {
		if (!value) return
		found = words.filter(word => word.includes(value))
	}
</script>

<form on:submit|preventDefault={search}>
	<TextBox
		type="search"
		placeholder="Search for a word..."
		bind:value
		required
		on:search={search} />
</form>
<section>
	{#each found as word (word)}
		<ListItem on:click={() => navigator.clipboard.writeText(word)}>{word}</ListItem>
	{:else}
		<InfoBar title="Nothing found!" message="Try searching for a substring." closable={false} />
	{/each}
</section>

<style>
	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
</style>
