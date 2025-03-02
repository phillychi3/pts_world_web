// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			discord: {
				access_token: string
				refresh_token: string
				expires_at: number
			} | null
		}
		interface PageData {
			user?: {
				discord?: {
					authenticated?: boolean
					avatar?: string
					username?: string
					id?: string
					email?: string
				} | null
				error?: string
			}
		}
		// interface Platform {}
	}
}

export {}
