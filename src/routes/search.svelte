<script context="module">
	import Search from "@fluentui/svg-icons/icons/search_20_filled.svg?raw"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ props }) {
		return {
			props,
			stuff: {
				name: "Search",
				description: "because you're lazy",
				icon: Search,
			},
		}
	}
</script>

<script>
	import { TextBox } from "fluent-svelte"
	import { goto } from "$app/navigation"
	import { flip } from "svelte/animate"
	import { page } from "$app/stores"
	let value = $page.url.searchParams.get("q")
	function submit() {
		goto("/search?q=" + encodeURIComponent(value))
	}
	export let tools
</script>

<form on:submit|preventDefault={submit}>
	<TextBox type="search" name="q" bind:value on:search={submit} autofocus required placeholder="Your query here..."/>
</form>
<section>
	{#each tools as { href, name, icon, description } (href)}
		<a sveltekit:prefetch {href} animate:flip={{ duration: 100 }}>
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
