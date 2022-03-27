// I FUCKING HATE THIS CODE SO MUCH
import Tools from "$lib/tools"
import Fuse from "fuse.js"
const tools = Tools.then(
	Tools =>
		new Fuse(Tools, {
			keys: ["name", "description"],
		})
)
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async ({ url }) => {
	if (!url.searchParams.get("q")) {
		return {
			status: 307,
			headers: {
				location: "/",
			},
		}
	}
	const fuse = await tools
	return {
		body: {
			tools: fuse.search(url.searchParams.get("q")).map(({ item }) => item),
		},
	}
}
