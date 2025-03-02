/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	try {
		const { discord } = locals || {}
		console.log('Discord locals:', discord)

		if (discord && discord.access_token) {
			try {
				const response = await fetch('https://discord.com/api/users/@me', {
					headers: {
						Authorization: `Bearer ${discord.access_token}`
					}
				})

				console.log('Discord API response status:', response.status)

				if (!response.ok) {
					const errorText = await response.text()
					console.error('Discord API error:', errorText)
					throw new Error(`Discord API responded with ${response.status}: ${errorText}`)
				}

				const userData = await response.json()
				console.log('Discord user data:', userData)
				return {
					user: {
						discord: {
							...userData,
							authenticated: true,
							avatar: userData.avatar
								? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
								: null
						}
					}
				}
			} catch (error) {
				console.error('Error fetching Discord user data:', error)
				return {
					user: {
						discord: null,
						error: error.message || 'Failed to fetch Discord data'
					}
				}
			}
		} else {
			console.log('No Discord token available')
		}
		return {
			user: {
				discord: null
			}
		}
	} catch (error) {
		console.error('Unexpected error in layout load function:', error)
		return {
			user: {
				discord: null,
				error: 'Server error'
			}
		}
	}
}
