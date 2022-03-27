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
	import { InfoBar, ListItem, TextBox, IconButton } from "fluent-svelte"
	import Back from "@fluentui/svg-icons/icons/caret_left_20_filled.svg?raw"
	import Forward from "@fluentui/svg-icons/icons/caret_right_20_filled.svg?raw"
	const chunk = (arr, size) =>
		Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
			arr.slice(i * size, i * size + size)
		)

	export let words = []
	let value = ""
	let found = []
	let page = 0
	function search() {
		if (!value) return
		found = words.filter(word => word.includes(value))
		page = 0
	}
</script>

<form on:submit|preventDefault={search}>
	<TextBox
		type="search"
		placeholder="Search for a substring..."
		bind:value
		required
		on:search={search} />
</form>
<section>
	{#each chunk(found, 25)[page] ?? [] as word (word)}
		<ListItem on:click={() => navigator.clipboard.writeText(word)}>{word}</ListItem>
	{:else}
		<InfoBar title="Nothing found!" message="Try searching for a substring." closable={false} />
	{/each}

	{#if found.length}
		<nav>
			<IconButton disabled={page === 0} on:click={() => page--}>{@html Back}</IconButton>
			{page}
			<IconButton disabled={Math.ceil(found.length / 25) <= page + 1} on:click={() => page++}
				>{@html Forward}</IconButton>
		</nav>
	{/if}
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
