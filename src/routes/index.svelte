<script context="module">
	import Troll from "@fluentui/svg-icons/icons/emoji_laugh_20_filled.svg?raw"
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ props }) {
		return {
			props,
			stuff: {
				name: "troll",
				description: "A collection of web tools from Mollybdenum.",
				icon: Troll,
			},
		}
	}
</script>

<script>
	import { goto } from "$app/navigation"
	import { TextBox } from "fluent-svelte"
	import Fuse from "fuse.js"

	let value = ""
	export let tools = []
	const fuse = new Fuse(tools, {
		keys: ["name", "description"],
	})
	$: listed = value ? fuse.search(value).map(({ item }) => item) : tools
	const go = () => goto(listed[0].href)
</script>

<form on:submit|preventDefault={go}>
	<TextBox type="search" placeholder="Search for a tool..." bind:value on:search={go} />
</form>

<section>
	{#each listed as { href, name, icon, description }}
		<a sveltekit:prefetch {href}>
			<h1>{@html icon} {name}</h1>
			<p>{description}</p>
		</a>
	{/each}
</section>

<style>
	section :global(h1) {
		font-size: 1em;
		display: flex;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
	section {
		column-count: auto;
		column-width: 250px;
		column-gap: 1em;
	}
	section :global(p) {
		white-space: pre-wrap;
	}
	section :global(a) {
		box-sizing: border-box;
		max-height: 300px;
		overflow-y: auto;
		display: inline-block;
		word-wrap: break-word;
		width: 100%;
		margin: 0 0 1em;
		padding: 1rem;
		background: var(--fds-solid-background-secondary);
		border-radius: 1em;
		color: var(--fds-text-primary);
	}

	section :global(a):hover {
		text-decoration: none;
	}
	@supports (grid-template-rows: masonry) {
		section {
			display: grid;
			column-gap: initial;
			column-count: initial;
			column-width: initial;
			gap: 0 1em;
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			grid-template-rows: masonry;
		}
	}
</style>
