<script>
	import { ProgressBar, IconButton } from "fluent-svelte"
	import { navigating, page } from "$app/stores"
	import CaretLeft from "@fluentui/svg-icons/icons/caret_left_20_filled.svg?raw"
	import Troll from "@fluentui/svg-icons/icons/emoji_laugh_20_filled.svg?raw"
	import Code from "@fluentui/svg-icons/icons/code_20_filled.svg?raw"
	import Sound from "$lib/troll.mp3"
	import "$lib/app.css"
	$: path = $page.url.pathname
</script>

{#if $navigating}
	<ProgressBar />
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

<footer>
	<hr />
	<!-- svelte-ignore missing-declaration -->
	<span>
		<IconButton on:click={() => new Audio(Sound).play()}>{@html Troll}</IconButton> troll
	</span>
	<hr />
	<span
		>made by <a href="https://5079.ml">Jack</a> &
		<a href="https://github.com/trollar">Charlie</a></span>
	<hr />
	<span
		>powered by <a href="https://kit.svelte.dev">SvelteKit</a> &
		<a href="https://fluent-svelte.vercel.app/">fluent-svelte</a></span>
	<hr />
	<span><IconButton href="https://github.com/trollar/start-page">{@html Code}</IconButton></span>
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
</style>
