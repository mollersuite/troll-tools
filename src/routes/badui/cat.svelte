<script context="module">
	import Cat from "@fluentui/svg-icons/icons/animal_cat_20_filled.svg?raw"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ props }) {
		return {
			props,
			stuff: {
				name: "the ca tay",
				description: "very cute",
				icon: Cat,
			},
		}
	}
</script>
<script>
import { goto } from '$app/navigation';

	import ca_tay from '$lib/assets/cat.mp4'
	let currentTime = 0
	$: currentTime > 2 && goto('./stage1')
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video src={ca_tay} controls bind:currentTime/>
<style>
	video {
		width: 300px;
		display: inline-block;
		aspect-ratio: 9/16;
	}
</style>
