import { error } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	console.log('rtcode', url.searchParams.get('code'))
	const rtcode = url.searchParams.get('code')
	if (url.searchParams.get('error')) {
		throw redirect(302, '/')
	}

	const dataObject = {
		client_id: DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: DISCORD_REDIRECT_URI,
		code: rtcode,
		scope: 'identify email guilds'
	}

	const request = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		// @ts-ignore
		body: new URLSearchParams(dataObject),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	})

	const response = await request.json()

	if (response.error) {
		error(400, response.error_description)
	}

	const access_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
	const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
	console.log('redirect to / with cookies')
	const headers = new Headers()
	headers.append('Location', '/')
	headers.append(
		'Set-Cookie',
		`dc_access_token=${response.access_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${access_token_expires_in.toUTCString()}`
	)
	headers.append(
		'Set-Cookie',
		`dc_refresh_token=${response.refresh_token}; Path=/; HttpOnly; SameSite=Strict; Expires=${refresh_token_expires_in.toUTCString()}`
	)

	return new Response('Redirecting...', {
		status: 302,
		headers
	})
}
