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
		const { channelIds } = await request.json()

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

		if (!Array.isArray(channelIds)) {
			return new Response(JSON.stringify({ error: 'channelIds must be an array' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		const convertToLong = (id) => {
			if (!id || id === '' || id === '0') return Long.fromNumber(0)
			try {
				return Long.fromString(id.toString())
			} catch (error) {
				return Long.fromNumber(0)
			}
		}

		const processedChannels = channelIds
			.filter((id) => id && id !== '' && id !== '0')
			.map(convertToLong)

		client = await MongoClient.connect(import.meta.env.VITE_MONGODB_URI)
		const collection = client.db('guilds').collection('guild')
		const guildIdLong = Long.fromString(params.id)

		const updateResult = await collection.updateOne(
			{ guild_id: guildIdLong },
			{
				$set: {
					autovoice: processedChannels
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
				message: 'Autovoice settings updated successfully',
				autovoice: processedChannels
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	} catch (err) {
		console.error('Error updating autovoice settings:', err)
		return new Response(JSON.stringify({ error: 'Invalid request data' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	} finally {
		if (client) await client.close()
	}
}
