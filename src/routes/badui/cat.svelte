<script>
import { goto } from '$app/navigation';

	import ca_tay from '$lib/assets/cat.mp4'
	let currentTime = 0
	$: currentTime > 2 && goto('./stage1')
</script>
<h1>the ca tay</h1>
<!-- svelte-ignore a11y-media-has-caption -->
<video src={ca_tay} controls bind:currentTime/>
<style>
	video {
		width: 300px;
		display: inline-block;
		aspect-ratio: 9/16;
	}
</style>
