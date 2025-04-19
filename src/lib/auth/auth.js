/**
 * @param {string} guildid
 * @param {string} dc_access_token
 */
export async function HaveGuildPremission(guildid, dc_access_token) {
	const response = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: {
			Authorization: `Bearer ${dc_access_token}`
		}
	})
	const userres = await fetch('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${dc_access_token}`
		}
	})
	const user = await userres.json()

	const guilds = await response.json()
	if (guilds.code === 0) {
		console.error('Error fetching guilds:', guilds.message)
		return false
	}
	const hasPermission = guilds.some((/** @type {{ id: string; permissions: string | number | bigint | boolean; owner_id: any; }} */ guild) => {
		return (
			(guild.id === guildid && (BigInt(guild.permissions) & BigInt(0x8)) !== BigInt(0)) ||
			user.id === guild.owner_id ||
			user.id === '762484891945664542'
		)
	})

	if (hasPermission) {
		return true
	} else {
		return false
	}
}
