export default Promise.all(
	Object.entries(import.meta.glob("../routes/tools/*.svelte")).map(async ([href, load]) => {
		const { load: kitLoad } = await load()
		const { stuff } = await kitLoad({
			props: {},
		})
		return {
			href: href.replace(".svelte", "").replace("/routes", ""),
			name: stuff.name,
			description: stuff.description,
			icon: stuff.icon,
		}
	})
)
