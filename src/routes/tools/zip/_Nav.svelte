<script>
	import { Button } from "fluent-svelte"
	import { getIconForOpenFolder } from "vscode-icons-js"
	export let directory = ""
</script>

<nav>
	<Button on:click={() => (directory = "")}>/</Button>
	{#each directory ? directory?.substring(0, directory.length - 1).split("/") : [] as folder, index}
		<Button
			on:click={() => {
				// cd folder
				directory =
					directory
						.split("/")
						.splice(0, index + 1)
						.join("/") + "/"
			}}>
			<img
				width="16"
				height="16"
				alt=""
				aria-hidden
				src="https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/{getIconForOpenFolder(
					folder
				)}" />{folder}</Button>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1ch;
		flex-direction: row;
	}
</style>
