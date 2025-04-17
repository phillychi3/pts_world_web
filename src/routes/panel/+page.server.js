/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch }) {
	if (locals.discord && locals.discord.access_token) {
		try {
			const response = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					Authorization: `Bearer ${locals.discord.access_token}`
				}
			})

			console.log('Discord Guilds API response status:', response.status)

			if (!response.ok) {
				const errorText = await response.text()
				console.error('Discord Guilds API error:', errorText)
				throw new Error(`Discord API responded with ${response.status}: ${errorText}`)
			}

			const guilds = await response.json()
			console.log(`Retrieved ${guilds.length} Discord servers`)

			const formattedGuilds = guilds.map((guild) => ({
				id: guild.id,
				name: guild.name,
				icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null,
				owner: guild.owner || false,
				permissions: guild.permissions,

				isAdmin: (BigInt(guild.permissions) & BigInt(0x8)) !== BigInt(0)
			}))

			return {
				discordGuilds: formattedGuilds
			}
		} catch (error) {
			console.error('Error fetching Discord guild data:', error)
			return {
				discordGuilds: [],
				error: '無法獲取 Discord 伺服器清單：' + (error.message || '未知錯誤')
			}
		}
	}

	return {
		discordGuilds: []
	}
}
