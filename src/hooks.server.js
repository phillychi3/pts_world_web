import cookie from 'cookie'
const HOST = import.meta.env.VITE_HOST
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	console.log('Hook is being executed')
	const cookies = cookie.parse(event.request.headers.get('cookie') || '')
	console.log('Cookies:', cookies)

	if (cookies.dc_refresh_token) {
		const expiresAt = cookies.dc_expires_at ? parseInt(cookies.dc_expires_at) : 0
		const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000

		if (expiresAt < fiveMinutesFromNow && cookies.dc_refresh_token) {
			try {
				const response = await fetch('https://discord.com/api/oauth2/token', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({
						client_id: DISCORD_CLIENT_ID,
						client_secret: DISCORD_CLIENT_SECRET,
						grant_type: 'refresh_token',
						refresh_token: cookies.dc_refresh_token
					})
				})

				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.error || 'Failed to refresh token')
				}

				const expires_at = Date.now() + data.expires_in * 1000

				event.cookies.set('dc_access_token', data.access_token, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					secure: HOST.startsWith('https'),
					maxAge: data.expires_in
				})

				event.cookies.set('dc_refresh_token', data.refresh_token, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					secure: HOST.startsWith('https'),
					maxAge: 30 * 24 * 60 * 60 // 30 天
				})

				event.cookies.set('dc_expires_at', expires_at.toString(), {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					secure: HOST.startsWith('https'),
					maxAge: data.expires_in
				})

				event.locals.discord = {
					access_token: data.access_token,
					refresh_token: data.refresh_token,
					expires_at
				}
			} catch (error) {
				console.error('Failed to refresh Discord token:', error)
				event.cookies.delete('dc_access_token', { path: '/' })
				event.cookies.delete('dc_refresh_token', { path: '/' })
				event.cookies.delete('dc_expires_at', { path: '/' })

				event.locals.discord = null
			}
		} else if (expiresAt > Date.now()) {
			event.locals.discord = {
				// @ts-ignore
				access_token: cookies.dc_access_token,
				refresh_token: cookies.dc_refresh_token,
				expires_at: expiresAt
			}
		}
	}

	return resolve(event)
}
