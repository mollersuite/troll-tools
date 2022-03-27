/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async () => {
	const tools = Object.entries(import.meta.glob("./tools/*.svelte"))

	return {
		body: {
			tools: await Promise.all(
				tools.map(async ([href, load]) => {
					const { load: kitLoad } = await load()
					const { stuff } = await kitLoad()
					return {
						href: href.replace(".svelte", ""),
						name: stuff.name,
						description: stuff.description,
						icon: stuff.icon,
					}
				})
			),
		},
	}
}
