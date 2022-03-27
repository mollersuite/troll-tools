<script>
	import { browser } from "$app/env"
	import { createWorker } from "tesseract.js"
	import link from "tesseract.js/dist/worker.min.js?url"
	import { ProgressBar } from "fluent-svelte"
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
	}

	$: if (browser) {
		const file = files[0]
		worker.recognize(file).then(data => (output = data.data.blocks))
	}
</script>

<svelte:head>
	<title>OCR</title>
	<meta name="description" content="Reads text from an image. (VERY EXPERIMENTAL!)" />
</svelte:head>
<h1>OCR</h1>
<p>Very experimental, I haven't even added a proper output! Powered by Tesseract.js</p>
{#if progress !== 100}
	{status}<ProgressBar value={progress} />
{/if}
<input type="file" bind:files accept="image/*" />
<pre>{JSON.stringify(output, (k, v) => (k === "page" ? undefined : v), 2)}</pre>
