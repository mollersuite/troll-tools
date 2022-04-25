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
	import { session } from '$app/stores'
	import ca_tay from '$lib/assets/cat.mp4'
	import { InfoBar } from 'fluent-svelte'
	let video
	import { onMount } from 'svelte'
	onMount(()=>{
		video.currentTime = 2
		video.play()
	})
</script>
<InfoBar title="Welcome" severity="success" message="Thank you for signing up, {$session.name}!" />
<InfoBar title="Warning" severity="caution" message="Your password ({$session.password}) is used by 5 people." />
<!-- svelte-ignore a11y-media-has-caption -->
<video src={ca_tay} controls bind:this={video} />
<style>
	video {
		width: 300px;
		display: inline-block;
		aspect-ratio: 9/16;
	}
</style>
