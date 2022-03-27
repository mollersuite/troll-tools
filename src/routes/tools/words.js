/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async () => {
	const { words } = await fetch("https://monkeytype.com/languages/english_450k.json").then(res =>
		res.json()
	)

	return {
		body: {
			words: words.filter(word => word.toLowerCase() === word && !word.includes("-")),
		},
	}
}
