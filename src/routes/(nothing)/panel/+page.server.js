/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, fetch }) {
	// 檢查使用者是否已登入 Discord
	if (locals.discord && locals.discord.access_token) {
		try {
			// 獲取使用者的伺服器清單
			const response = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					Authorization: `Bearer ${locals.discord.access_token}`
				}
			})

			// 記錄 API 響應狀態
			console.log('Discord Guilds API response status:', response.status)

			if (!response.ok) {
				const errorText = await response.text()
				console.error('Discord Guilds API error:', errorText)
				throw new Error(`Discord API responded with ${response.status}: ${errorText}`)
			}

			// 解析 API 響應
			const guilds = await response.json()
			console.log(`Retrieved ${guilds.length} Discord servers`)

			// 將伺服器資訊轉換為更好用的格式
			const formattedGuilds = guilds.map((guild) => ({
				id: guild.id,
				name: guild.name,
				icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null,
				owner: guild.owner || false,
				permissions: guild.permissions,
				// 計算權限
				isAdmin: (BigInt(guild.permissions) & BigInt(0x8)) !== BigInt(0) // 檢查 ADMINISTRATOR 權限
			}))

			// 返回伺服器清單供前端使用
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

	// 如果使用者未登入，返回空清單
	return {
		discordGuilds: []
	}
}
