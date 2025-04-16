/** @type {import('./$types').RequestHandler} */
import { MongoClient } from 'mongodb'

export async function GET() {
	MongoClient.connect(import.meta.env.VITE_MONGODB_URI, (err, client) => {
		if (err) {
			console.error('Failed to connect to the database:', err)
			return
		}
	})

	return new Response()
}
