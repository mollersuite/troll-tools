<script context="module">
	import Link from "@fluentui/svg-icons/icons/link_20_filled.svg?raw"
	import { TextBox } from "fluent-svelte"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		return {
			stuff: {
				name: "loadstring generator",
				description: "like Loadstringer but good",
				icon: Link,
			},
		}
	}
</script>

<script>
	let value = ""
	function get_name(name) {
		// strip protocol
		name = name.replace(/^https?:\/\//, "")
		// https://raw.githubusercontent.com/aznn/chrome-dino-game-bot/master/script.js -> aznn/chrome-dino-game-bot/master/script.js
		if (name.startsWith("raw.githubusercontent.com/")) {
			name = name.replace(/^raw.githubusercontent.com\//, "")
			name = name.replace(/^[^/]+\/[^/]+\/[^/]+\//, "")
		}
		return name
	}
</script>

<TextBox bind:value />
<pre>{`loadstring(game:HttpGetAsync "${value}", "${get_name(value)}")()`}</pre>
