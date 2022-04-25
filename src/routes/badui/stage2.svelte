<script>
import { goto } from '$app/navigation';

import { session } from '$app/stores';

import { Button, InfoBar } from 'fluent-svelte';
</script>
<InfoBar title="Welcome" severity="success" message="Thank you for giving us your name, {$session.name}! Now for your password:" closable={false}/>
<p>You must visit <a target="_blank" href="https://scriptblox.com/script/Universal-Script-mollermethod-2176">mollermethod's ScriptBlox page</a> and comment "i vouch: " and then your password.</p>
<p>This is so we can store your password and have Thunder Mods pay for it.</p>
<Button variant="accent" on:click={async ()=>{
	const out = await fetch('https://scriptblox.com/api/comment/62620b0a3b0c27054e6aad71?page=2&max=7').then(res=>res.json());
	const latest = out.result.comments.at(-1).text;
	$session.password = latest.replace('i vouch: ', '')
	goto('./cat2')
}}>Thanks, I just did</Button>
