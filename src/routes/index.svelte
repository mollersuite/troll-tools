<script>
  const engines = {
    Bing: 'https://bing.com/search',
    You: 'https://you.com/search',
    Google: 'https://google.com/search',
    DuckDuckGo: 'https://duckduckgo.com',
    Qwant: 'https://qwant.com',
    Yahoo: 'https://search.yahoo.com/search',
    Linux: 'https://searx.projectlounge.pw/search'
  }
  let engine = engines.Bing
	import { TextBox, ComboBox } from "fluent-svelte"
</script>

<h1>trollarweb</h1>

<form action={engine} target="_blank">
  <TextBox name="q" type=search/>
  <input type="hidden" name="t" value="h_" />
  <input type="hidden" name="ia" value="web" />
  
</form>

<ComboBox items={Object.entries(engines).map(([name,value]) => ({ name,value }))} bind:value={engine} />

<svelte:head>
  <title>trollarweb</title>
</svelte:head>

<style>
  form {
    margin-bottom: 2em;
  }
</style>