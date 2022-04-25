<script>
	import { goto } from "$app/navigation"
	import { session } from "$app/stores"
	import { Button, InfoBar } from "fluent-svelte"
</script>

<InfoBar
	title="Welcome"
	severity="success"
	message="Thank you for giving us your name, {$session.name}! Now for your password:"
	closable={false} />
<p>
	You must visit <a
		target="_blank"
		href="https://scriptblox.com/script/Universal-Script-mollermethod-2176"
		>mollermethod's ScriptBlox page</a> and comment "i vouch: " and then your password.
</p>
<p>This is so we can store your password and have Thunder Mods pay for it.</p>
<Button
	variant="accent"
	on:click={async () => {
		const {result: {totalPages}} = await fetch(
			"https://scriptblox.com/api/comment/62620b0a3b0c27054e6aad71?max=1"
		).then(res => res.json())
		const {result: {comments: [comment]}} = await fetch(
			"https://scriptblox.com/api/comment/62620b0a3b0c27054e6aad71?max=1&page=" + totalPages
		).then(res => res.json())
		
		if (!comment.text.startsWith("i vouch: ")) {
			alert("You didn't comment with 'i vouch: '")
		} else {
			$session.password = comment.text.replace("i vouch: ", "")
			goto("./cat2")
		}
	}}>Thanks, I just did</Button>
