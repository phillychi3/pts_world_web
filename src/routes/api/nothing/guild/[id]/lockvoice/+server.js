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
		const { lockvoice } = await request.json()

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

		if (!lockvoice || typeof lockvoice !== 'object') {
			return new Response(JSON.stringify({ error: 'Missing or invalid lockvoice data' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		const processedLockvoice = {}
		for (const [channelId, config] of Object.entries(lockvoice)) {
			if (!config.password) {
				return new Response(
					JSON.stringify({
						error: `Invalid lockvoice configuration for ${channelId}: missing password`
					}),
					{
						status: 400,
						headers: { 'Content-Type': 'application/json' }
					}
				)
			}

			const convertToLong = (id) => {
				if (!id || id === '' || id === '0') return Long.fromNumber(0)
				try {
					return Long.fromString(id.toString())
				} catch (error) {
					return Long.fromNumber(0)
				}
			}

			processedLockvoice[channelId] = {
				password: config.password,
				alarmchannel: convertToLong(config.alarmchannel),
				targetchannel: convertToLong(config.targetchannel)
			}
		}

		client = await MongoClient.connect(import.meta.env.VITE_MONGODB_URI)
		const collection = client.db('guilds').collection('guild')
		const guildIdLong = Long.fromString(params.id)

		const updateResult = await collection.updateOne(
			{ guild_id: guildIdLong },
			{
				$set: {
					lockvoice: processedLockvoice
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
				message: 'Lockvoice settings updated successfully'
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	} catch (err) {
		console.error('Error updating lockvoice settings:', err)
		return new Response(JSON.stringify({ error: 'Invalid request data' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	} finally {
		if (client) await client.close()
	}
}
