<script>
	import { navigating, page } from "$app/stores"
	import "$lib/app.css"
	import CaretLeft from "@fluentui/svg-icons/icons/caret_left_20_filled.svg?raw"
	import { ProgressBar } from "fluent-svelte"
	$: path = $page.url.pathname
</script>

{#if $navigating}
	<ProgressBar />
{/if}
{#if path !== "/"}
	<a href="/" sveltekit:prefetch>{@html CaretLeft} Back to index</a>
{/if}

<main>
	<slot />
</main>

<footer>
	<hr />
	&copy; {new Date().getFullYear()} trollarTech GP
</footer>

<style>
	a :global(svg) {
		fill: currentColor;
	}
	a {
		display: flex;
		margin: 0 auto;
		max-width: 1200px;
		width: 100%;
		margin-top: 1em;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
	a:hover {
		text-decoration: none;
	}
	hr {
		width: 100%;
	}
	footer {
		width: 100%;
		/* max-width: 1200px; */
		margin: 0 auto;
		text-align: center;
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
			text-align: left;
		}
	}
</style>
