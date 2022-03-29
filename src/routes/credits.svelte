<script context="module">
	import PersonQuestionMark from "@fluentui/svg-icons/icons/person_question_mark_20_filled.svg?raw"
	export const prerender = true
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ props }) {
		return {
			props,
			stuff: {
				name: "Credits",
				description: "Who made this site?",
				icon: PersonQuestionMark,
			},
		}
	}
</script>

<h2>People</h2>
<ul>
	<li><a href="https://5079.ml">Jack</a> made most of the website</li>
	<li>
		<a href="https://github.com/trollar">Charlie</a> did trollarweb (the first tool), and got the domain
		name
	</li>
	<li>
		Alex (aka Amourousity) gave us some ideas (like the <a href="/tools/words" sveltekit:prefetch
			>Word Search</a> tool) and I stole the Robux Generator's algorithm from a snippet he posted
	</li>
</ul>

<h2>Packages</h2>
<p>The following packages are used in this project:</p>
<ul>
	<li>
		<a href="https://svelte.dev">svelte</a> is the web framework we used
	</li>
	<li>
		<a href="https://kit.svelte.dev/">@sveltejs/kit</a> for routing and backend
	</li>
	<li>
		<a href="https://fluent-svelte.vercel.app/">fluent-svelte</a> for the fluent design components and
		color palette
	</li>
	<li>
		<a href="https://github.com/microsoft/fluentui-system-icons">@fluentui/svg-icons</a> for the icons
	</li>
	<li>
		<a href="http://fusejs.io/">fuse.js</a> for fuzzy search on the index
	</li>
	<li>
		<a href="https://fonts.google.com/specimen/Space+Mono">@fontsource/space-mono</a> for the code font
	</li>
	<li>
		<a href="https://github.com/github/hotkey">@github/hotkey</a> for the double backtick search shortcut
	</li>
</ul>

<h2>Other</h2>
<p>The site is hosted on <a href="https://pages.dev">Cloudflare Pages.</a></p>
