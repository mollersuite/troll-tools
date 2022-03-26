<script>
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
	}
	import { page } from "$app/stores"
	import { TextBox, RadioButton, ListItem } from "fluent-svelte"
	import { fly } from "svelte/transition"
	$: engine = engines[$page.url.searchParams.get("engine")] ?? engines.Bing
</script>

<h1>trollarweb</h1>

<form action={engine} target="_blank">
	<TextBox name="q" type="search" />
	<input type="hidden" name="t" value="h_" />
	<input type="hidden" name="ia" value="web" />
	{#if engine === engines.OpenCorporates}
		<nav in:fly={{ x: -10 }} out:fly={{ x: 10 }}>
			<RadioButton name="type" value="companies">Companies</RadioButton>
			<RadioButton name="type" value="officers">Officers</RadioButton>
		</nav>
	{/if}
</form>

{#each Object.keys(engines) as name}
	<ListItem href="?engine={name}" selected={engine === engines[name]}>{name}</ListItem>
{/each}

<svelte:head>
	<title>trollarweb</title>
	<meta name="description" content="trolls your start page" />
</svelte:head>

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
