<script context="module">
	import GlobalSearch from "@fluentui/svg-icons/icons/globe_search_20_filled.svg?raw"
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		return {
			stuff: {
				name: "trollarweb",
				description: "trolls your start page",
				icon: GlobalSearch,
			},
		}
	}
</script>

<script>
	import { page } from "$app/stores"

	const engines = {
		Bing: "https://bing.com/search",
		You: "https://you.com/search",
		Google: "https://google.com/search",
		DuckDuckGo: "https://duckduckgo.com",
		Qwant: "https://qwant.com",
		Yahoo: "https://search.yahoo.com/search",
		Linux: "https://searx.projectlounge.pw",
		OpenCorporates: "https://opencorporates.com/search",
		Twitter: "https://twitter.com/search",
		Youtube: "https://www.youtube.com/results",
		troll: $page.url.origin,
	}
	import { TextBox, RadioButton, ListItem } from "fluent-svelte"
	import { fly } from "svelte/transition"
	$: engine = engines[$page.url.searchParams.get("engine")] ?? engines.Bing
</script>

<form action={engine} target="_blank">
	<TextBox name="q" type="search" />
	<input type="hidden" name="t" value="h_" />
	<input type="hidden" name="ia" value="web" />
	{#if engine === engines.OpenCorporates}
		<nav in:fly|local={{ x: -10 }} out:fly|local={{ x: 10 }}>
			<RadioButton name="type" value="companies">Companies</RadioButton>
			<RadioButton name="type" value="officers">Officers</RadioButton>
		</nav>
	{/if}
</form>

{#each Object.keys(engines) as name}
	<ListItem sveltekit:noscroll href="?engine={name}" selected={engine === engines[name]}
		>{name}</ListItem>
{/each}

<style>
	form {
		margin-bottom: 2em;
	}
	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 1ch;
		margin-top: 2em;
		flex-direction: row;
	}
</style>
