/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, params, fetch }) {
	const { discord } = locals || {}

	if (!params.id) {
		return {
			guild: null,
			error: 'Guild ID is required'
		}
	}

	if (!params.id.match(/^\d+$/)) {
		return {
			guild: null,
			error: 'Invalid Guild ID'
		}
	}

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
				if (response.status === 403) {
					return {
						guild: null,
						error: 'You do not have permission to access this guild.'
					}
				}
				const errorText = await response.text()
				console.error('API error:', errorText)
				if (JSON.parse(errorText).error === 'Guild not found') {
					return {
						guild: null,
						error: 'Guild not found'
					}
				}
				return {
					guild: null,
					error: 'Failed to fetch guild data'
				}
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
export const prerender = false
