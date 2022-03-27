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
		class="sticky"
		type="search"
		placeholder="Search for a substring..."
		bind:value
		required
		on:search={search} />

	{#if found.length}
		<nav>
			<IconButton type="button" disabled={page === 0} on:click={() => page--}
				>{@html Back}</IconButton>
			{page}
			<IconButton
				type="button"
				disabled={Math.ceil(found.length / 100) <= page + 1}
				on:click={() => page++}>{@html Forward}</IconButton>
		</nav>
	{/if}
</form>
<section>
	{#each chunk(found, 100)[page] ?? [] as word (word)}
		<ListItem on:click={() => navigator.clipboard.writeText(word)}>{word}</ListItem>
	{:else}
		<InfoBar title="Nothing found!" message="Try searching for a substring." closable={false} />
	{/each}
</section>

<style>
	nav {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		gap: 0;
		flex-direction: row;
		font-family: "Space Mono", ui-monospace, "Input Mono", "Cascadia Mono", "Segoe UI Mono",
			"Ubuntu Mono", "Roboto Mono", "Fira Code", Menlo, Monaco, Consolas, monospace;
	}
	form {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0;
		flex-direction: row;
		position: sticky;
		top: 0;
		z-index: 2;
	}
</style>
