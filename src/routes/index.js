import tools from "$lib/tools"

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async () => ({
	body: {
		tools: await tools,
	},
})
