<script context="module">
	import OCR from "@fluentui/svg-icons/icons/scan_text_20_filled.svg?raw"
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		return {
			stuff: {
				name: "OCR",
				description:
					"Very experimental, I haven't even added a proper output! Powered by Tesseract.js",
				icon: OCR,
			},
		}
	}
</script>

<script>
	import { browser } from "$app/env"
	import { createWorker } from "tesseract.js"
	import link from "tesseract.js/dist/worker.min.js?url"
	import { ProgressBar } from "fluent-svelte"
	import { onDestroy } from "svelte"
	let progress = 100
	let status = ""
	/**
	 * @type {ArrayLike<File>}
	 */
	let files = []
	/**
	 * @type {import('tesseract.js').Block[]}
	 */
	let output = []
	/**
	 * @type {import('tesseract.js').Worker}
	 */
	let worker
	if (browser) {
		worker = createWorker({
			logger(data) {
				console.log(data)
				if (data.progress !== undefined) {
					progress = data.progress * 100
					status = data.status
				}
			},
			workerPath: link,
			workerBlobURL: false,
		})
		worker.load().then(async () => {
			await worker.loadLanguage("eng")
			await worker.initialize("eng")
		})
		onDestroy(() => worker.terminate())
	}

	$: if (browser) {
		const file = files[0]
		worker.recognize(file).then(data => (output = data.data.blocks))
	}
</script>

{#if progress !== 100}
	{status}<ProgressBar value={progress} />
{/if}
<input type="file" bind:files accept="image/*" />
<pre>{JSON.stringify(output, (k, v) => (k === "page" ? undefined : v), 2)}</pre>
