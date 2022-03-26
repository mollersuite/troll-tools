<script>
	import "$lib/app.css"
</script>

<main>
	<slot />
</main>

<footer>
	<hr />
	&copy; {new Date().getFullYear()} trollarTech GP
</footer>

<style>
	hr {
		width: 100%;
	}
	footer {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
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
		}
	}
</style>
