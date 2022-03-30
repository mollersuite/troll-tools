import adapter from "@sveltejs/adapter-auto"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				"script-src": ["self", "blob:"],
				"object-src": ["none"],
			},
		},
	},
}

export default config
