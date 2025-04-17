/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, params, fetch }) {
	const { discord } = locals || {}

	if (discord && discord.access_token) {
		try {
			const response = await fetch(`/api/nothing/getGuildData/${params.id}`, {
				method: 'POST',
				body: JSON.stringify({
					token: discord.access_token
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!response.ok) {
				const errorText = await response.text()
				console.error('API error:', errorText)
				throw new Error(`API responded with ${response.status}: ${errorText}`)
			}
			const guildData = await response.json()
			return {
				guild: guildData
			}
		} catch (err) {
			console.error(err)
			return {
				guild: null,
				error: 'Failed to fetch guild data'
			}
		}
	}

	return {
		guild: null,
		error: 'No Discord token available'
	}
}
