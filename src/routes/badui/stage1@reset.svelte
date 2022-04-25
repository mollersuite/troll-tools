<script>
	import { goto } from "$app/navigation"
	import { session } from "$app/stores"
	import { Button, InfoBar } from "fluent-svelte"
	import { flip } from "svelte/animate"
	import { scale as slide } from "svelte/transition"

	let inputs = Array.from({ length: 128 - 32 }, (_, i) => i + 32)
	let output = ""
	let unicode = false
	let shuffled = false
	let security = []
	const shuffle = ([...arr]) => {
		let m = arr.length
		while (m) {
			const i = Math.floor(Math.random() * m--)
			;[arr[m], arr[i]] = [arr[i], arr[m]]
		}
		return arr
	}
</script>

<InfoBar severity="critical" title="Account required" message="To watch the rest of the video, you'll need an account." closable={false}/>
Start making an account by giving us your name:
<code>{output}</code>
<br />
{#if security.length}
	For your security we have shuffled the keyboard and have removed these characters: {String.fromCodePoint(
		...security
	)}
{:else if unicode}
	For your security we have switched the buttons to Unicode codepoints
{:else if shuffled}
	For your security we have shuffled the keyboard
{/if}
<nav>
	{#each inputs as input, i (input)}
		<button
			transition:slide|local={{ duration: 1000, delay: i * 5 }}
			animate:flip={{ duration: 1000, delay: i * 5 }}
			on:click={() => {
				output += String.fromCodePoint(input)
				if (unicode) {
					const arr = shuffle(Array.from({ length: 128 - 32 }, (_, i) => i + 32))
					inputs = arr.slice(0, 50)
					security = arr.slice(50)
				} else if (shuffled) {
					unicode = true
				} else {
					const arr = shuffle(Array.from({ length: 128 - 32 }, (_, i) => i + 32))
					inputs = arr
					shuffled = true
				}
			}}>
			{unicode ? `U+${input.toString(16).toUpperCase()}` : String.fromCodePoint(input)}
		</button>
	{/each}
</nav>

<Button
	variant="accent"
	on:click={() => {
		$session.name = output
		goto("./stage2")
	}}>Submit</Button>

<style>
	button {
		width: 10%;
		height: 20px;
		padding: 0;
		margin: 0;
	}
</style>
