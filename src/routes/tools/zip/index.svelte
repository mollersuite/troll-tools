<script context="module">
	import FolderZip from "@fluentui/svg-icons/icons/folder_zip_20_filled.svg?raw"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		return {
			stuff: {
				name: "Archive Viewer",
				description: "See what's inside that .zip file.",
				icon: FolderZip,
			},
		}
	}
</script>

<script>
	import { ZipReader, BlobReader, BlobWriter, getMimeType } from "@zip.js/zip.js"
	import { getIconForFile, getIconForFolder, getIconForOpenFolder } from "vscode-icons-js"
	import { ListItem, ProgressRing, Button } from "fluent-svelte"
	import Nav from "./_Nav.svelte"
	/**
	 * @type {FileList}
	 */
	let files
	let directory = ""
	$: zip = files?.[0] && new ZipReader(new BlobReader(files.item(0)), {}).getEntries()
	$: in_dir = zip?.then(entries =>
		entries.filter(
			entry =>
				entry.filename.startsWith(directory) &&
				!entry.filename
					.substring(directory.length + 1, entry.directory ? entry.filename.length - 1 : undefined)
					.includes("/") &&
				entry.filename !== directory
		)
	)

	function download(blob, name) {
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.href = url
		a.download = name
		// document.body.appendChild(a)
		a.click()
		// document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}
</script>

<input type="file" accept=".zip,.gz" bind:files />
{#if zip}
	{#await in_dir}
		<ProgressRing />
	{:then entries}
		<Nav bind:directory />
		<ul>
			{#each entries.filter(entry => entry.directory) as entry}
				<ListItem
					on:click={() => {
						directory = entry.filename
					}}>
					<img
						slot="icon"
						width="16"
						height="16"
						alt=""
						aria-hidden
						src="https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/{getIconForFolder(
							entry.filename
						)}" />
					{entry.filename.substring(directory.length)}
				</ListItem>
			{/each}
			{#each entries.filter(entry => !entry.directory) as entry}
				<ListItem
					on:click={() =>
						entry
							.getData(new BlobWriter(getMimeType(entry.filename)))
							.then(blob => download(blob, entry.filename.substring(directory.length)))}>
					<img
						slot="icon"
						width="16"
						height="16"
						alt=""
						aria-hidden
						src="https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/{getIconForFile(
							entry.filename
						)}" />
					{entry.filename.substring(directory.length)}
				</ListItem>
			{/each}
		</ul>
	{:catch error}
		<p>{error.message}</p>
	{/await}
{/if}

<style>
	img {
		margin-inline-end: 16px;
		block-size: auto;
		inline-size: 16px;
	}
</style>
