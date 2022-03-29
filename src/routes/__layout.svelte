<script>
	import { ProgressBar, IconButton, Button, ContentDialog, TextBox } from "fluent-svelte"
	import { navigating, page } from "$app/stores"
	import { install } from "@github/hotkey"
	import { goto } from "$app/navigation"
	import CaretLeft from "@fluentui/svg-icons/icons/caret_left_20_filled.svg?raw"
	import Troll from "@fluentui/svg-icons/icons/emoji_laugh_20_filled.svg?raw"
	import Search from "@fluentui/svg-icons/icons/search_20_filled.svg?raw"
	import Code from "@fluentui/svg-icons/icons/code_20_filled.svg?raw"
	import PersonQuestionMark from "@fluentui/svg-icons/icons/person_question_mark_20_filled.svg?raw"
	import Sound from "$lib/troll.mp3"

	import "$lib/app.css"
	$: path = $page.url.pathname

	let search_button
	let search_open = false
	$: search_button && install(search_button, "` `")
	let value
	function go() {
		goto("/?q=" + value)
		search_open = false
	}
</script>

{#if $navigating}
	<ProgressBar class="fixed" />
{/if}

{#if path !== "/"}
	<a href="/" sveltekit:prefetch class="back">{@html CaretLeft} Back to index</a>
{/if}

<svelte:head>
	{#if $page.stuff.name}
		<title>{$page.stuff.name}</title>
		<meta name="description" content={$page.stuff.description} />
	{/if}
</svelte:head>

<main>
	{#if $page.stuff.name}
		<h1>{@html $page.stuff.icon ?? ""} {$page.stuff.name}</h1>
		<p>{$page.stuff.description}</p>
	{/if}
	<slot />
</main>
<ContentDialog
	bind:open={search_open}
	title="Search"
	on:backdropclick={() => (search_open = false)}>
	<form action="/" on:submit|preventDefault={go}>
		<TextBox type="search" name="q" bind:value on:search={go} />
	</form>
</ContentDialog>
<footer>
	<hr />
	<!-- svelte-ignore missing-declaration -->
	{#if path !== "/"}
		<Button
			bind:element={search_button}
			title="Search (Press backtick twice)"
			on:click={() => console.log((search_open = !search_open))}>
			{@html Search}</Button>
	{:else}
		<IconButton title="troll" on:click={() => new Audio(Sound).play()}>{@html Troll}</IconButton>
	{/if}
	<hr />
	<IconButton title="Credits" rel="author" href="/credits">{@html PersonQuestionMark}</IconButton>
	<hr />
	<IconButton title="Source code" href="https://github.com/trollar/start-page"
		>{@html Code}</IconButton>
	<hr />
</footer>

<style>
	.back {
		display: flex;
		margin: 0 auto;
		max-width: 1200px;
		width: 100%;
		margin-top: 1em;
		align-items: center;
		gap: 1ch;
	}
	a:hover {
		text-decoration: none;
	}
	hr {
		flex-grow: 1;
		border-color: var(--fds-text-disabled);
	}
	footer {
		width: 100%;
		margin: 0 auto;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 1ch;
		flex-direction: column;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		box-sizing: border-box;
	}
	@media (min-width: 1200px) {
		footer {
			margin-bottom: 2em;
			flex-direction: row;
		}
	}
	@media (max-width: 1199px) {
		footer {
			justify-content: stretch;
		}
		hr {
			width: 90%;
		}
		hr:first-child,
		hr:last-child {
			display: none;
		}
	}
	:global(.fixed) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: var(--fds-background-disabled);
		opacity: 0.5;
	}
</style>
