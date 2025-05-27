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
		const { role_dropdown } = await request.json()

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

		if (!role_dropdown || typeof role_dropdown !== 'object') {
			return new Response(JSON.stringify({ error: 'Missing or invalid role_dropdown data' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		// 驗證 role_dropdown 結構
		for (const [dropdownId, dropdown] of Object.entries(role_dropdown)) {
			if (!dropdown.channel_id || !dropdown.listname) {
				return new Response(JSON.stringify({
					error: `Invalid dropdown configuration for ${dropdownId}: missing channel_id or listname`
				}), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				})
			}

			if (dropdown.roles && Array.isArray(dropdown.roles)) {
				for (const role of dropdown.roles) {
					if (!role.label || !role.value) {
						return new Response(JSON.stringify({
							error: `Invalid role configuration in ${dropdownId}: missing label or value`
						}), {
							status: 400,
							headers: { 'Content-Type': 'application/json' }
						})
					}
				}
			}
		}

		client = await MongoClient.connect(import.meta.env.VITE_MONGODB_URI)
		const collection = client.db('guilds').collection('guild')
		const guildIdLong = Long.fromString(params.id)

		const updateResult = await collection.updateOne(
			{ guild_id: guildIdLong },
			{
				$set: {
					role_dropdown: role_dropdown
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
				message: 'Role dropdown settings updated successfully'
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	} catch (err) {
		console.error('Error updating role dropdown settings:', err)
		return new Response(JSON.stringify({ error: 'Invalid request data' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	} finally {
		if (client) await client.close()
	}
}