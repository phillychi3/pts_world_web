/** @type {import('./$types').RequestHandler} */
import { MongoClient, Long } from 'mongodb'
import { HaveGuildPremission } from '$lib/auth/auth'

export async function POST({ params, request }) {
	let client = null

	if (!params.id) {
		return new Response(JSON.stringify({ error: 'Missing guild ID' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	try {
		const { token } = await request.json()
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
	} catch (err) {
		console.error(err)
		return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	try {
		client = await MongoClient.connect(import.meta.env.VITE_MONGODB_URI)
		const collection = client.db('guilds').collection('guild')
		const guildIdLong = Long.fromString(params.id)

		const data = await collection.findOne({ guild_id: guildIdLong })
		if (!data) {
			return new Response(JSON.stringify({ error: 'Guild not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	} catch (err) {
		console.error('Database error:', err)
		return new Response(JSON.stringify({ error: '資料庫操作失敗' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	} finally {
		if (client) await client.close()
	}
}
