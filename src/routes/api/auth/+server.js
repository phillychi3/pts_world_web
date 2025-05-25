/** @type {import('./$types').RequestHandler} */

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify+guilds`
import { redirect } from '@sveltejs/kit'
export async function GET() {
	throw redirect(302, DISCORD_ENDPOINT)
}
