<script context="module">
	export const prerender = true
</script>

<script>
	import GlobalSearch from "@fluentui/svg-icons/icons/globe_search_20_filled.svg?raw"
</script>

<h1>troll</h1>

<svelte:head>
	<title>troll</title>
	<meta name="description" content="trolls you" />
</svelte:head>

<section>
	<a sveltekit:prefetch href="/start">
		<h1>{@html GlobalSearch} trollweb</h1>
		<p>troll your world!</p>
	</a>
</section>

<style>
	section :global(svg) {
		fill: currentColor;
	}
	section {
		fill: currentColor;
	}
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
