import { VITE_DISCORD_BOT_TOKEN } from '$env/static/private'

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, cookies }) {
	try {
		const guildId = params.id
		const accessToken = cookies.get('dc_access_token')

		if (!guildId) {
			return new Response(JSON.stringify({ error: 'Guild ID is required' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		if (!accessToken) {
			return new Response(JSON.stringify({ error: 'Access token not found' }), {
				status: 401,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		const userGuildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			}
		})

		if (!userGuildsResponse.ok) {
			return new Response(JSON.stringify({ error: 'Failed to verify user permissions' }), {
				status: 403,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		const userGuilds = await userGuildsResponse.json()
		const hasAccess = userGuilds.some((guild) => guild.id === guildId)

		if (!hasAccess) {
			return new Response(JSON.stringify({ error: 'No permission to access this guild' }), {
				status: 403,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		const channelsResponse = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
			headers: {
				Authorization: `Bot ${VITE_DISCORD_BOT_TOKEN}`,
				'Content-Type': 'application/json'
			}
		})

		if (!channelsResponse.ok) {
			if (channelsResponse.status === 401) {
				return new Response(JSON.stringify({ error: 'Invalid bot token' }), {
					status: 401,
					headers: {
						'Content-Type': 'application/json'
					}
				})
			}

			if (channelsResponse.status === 403) {
				return new Response(
					JSON.stringify({ error: 'Bot does not have permission to access this guild' }),
					{
						status: 403,
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
			}

			throw new Error(`Discord API error: ${channelsResponse.status}`)
		}

		const channels = await channelsResponse.json()

		const organizedChannels = {
			text: [],
			voice: [],
			category: [],
			forum: [],
			announcement: []
		}

		channels.forEach((channel) => {
			const channelData = {
				id: channel.id,
				name: channel.name,
				type: channel.type,
				position: channel.position,
				parent_id: channel.parent_id
			}

			switch (channel.type) {
				case 0: // GUILD_TEXT
					organizedChannels.text.push(channelData)
					break
				case 2: // GUILD_VOICE
					organizedChannels.voice.push(channelData)
					break
				case 4: // GUILD_CATEGORY
					organizedChannels.category.push(channelData)
					break
				case 5: // GUILD_ANNOUNCEMENT
					organizedChannels.announcement.push(channelData)
					break
				case 15: // GUILD_FORUM
					organizedChannels.forum.push(channelData)
					break
				default:
					break
			}
		})

		Object.keys(organizedChannels).forEach((type) => {
			organizedChannels[type].sort((a, b) => a.position - b.position)
		})

		return new Response(
			JSON.stringify({
				guildId,
				channels: organizedChannels,
				totalChannels: channels.length
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	} catch (error) {
		console.error('Error fetching guild channels:', error)

		return new Response(
			JSON.stringify({
				error: 'Failed to fetch guild channels',
				details: error.message
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}
}
