/** @type {import('./$types').RequestHandler} */
import { MongoClient, Long } from 'mongodb'
import { HaveGuildPremission } from '$lib/auth/auth'

export async function POST({ params, request, cookies }) {
	let client = null

	if (!params.id) {
		return new Response(JSON.stringify({ error: 'Missing guild ID' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	try {
		const { welcome, leave } = await request.json()

		const token = cookies.get('dc_access_token')

		if (!token) {
			return new Response(JSON.stringify({ error: 'Missing token' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		if (!(await HaveGuildPremission(params.id, token))) {
			return new Response(JSON.stringify({ error: 'Permission denied' }), {
				status: 403,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		if (!welcome || !leave) {
			return new Response(JSON.stringify({ error: 'Missing welcome or leave data' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		client = await MongoClient.connect(import.meta.env.VITE_MONGODB_URI)
		const collection = client.db('guilds').collection('guild')
		const guildIdLong = Long.fromString(params.id)

		const updateResult = await collection.updateOne(
			{ guild_id: guildIdLong },
			{
				$set: {
					welcome: {
						channel: welcome.channel || 0,
						message: welcome.message || '歡迎 {user} 來到 {server}!'
					},
					leave: {
						channel: leave.channel || 0,
						message: leave.message || '{user} 離開了 {server}!'
					}
				}
			}
		)

		if (updateResult.matchedCount === 0) {
			return new Response(JSON.stringify({ error: 'Guild not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Settings updated successfully'
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	} catch (err) {
		console.error('Error updating welcome settings:', err)
		return new Response(JSON.stringify({ error: 'Invalid request data' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	} finally {
		if (client) await client.close()
	}
}
