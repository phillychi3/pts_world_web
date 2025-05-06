<script>
	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props()
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { endNavigation, startNavigation } from '$lib/stores/navigation'

	let isLoading = $state(true)

	const guild = $derived(data?.guild)
	const re = new RegExp('^/panel/guild/\\d+/(.+)$')
	const match = re.exec(page.url.pathname)
	const path = match ? match[1] : ''

	let currentPath = $state(path)
	/**
	 * @param {string} path
	 */
	async function go(path) {
		let guildId
		if (guild?.guild_id) {
			const highPart = BigInt(guild.guild_id.high) * BigInt(4294967296)
			const lowPart = BigInt(guild.guild_id.low >>> 0)
			guildId = String(highPart + lowPart)
		} else {
			guildId = page.params.id
		}

		startNavigation()

		const newPath = `/panel/guild/${guildId}/${path}`
		if (newPath !== page.url.pathname) {
			await goto(newPath)
			currentPath = path
		}
	}

	onMount(() => {
		setTimeout(() => {
			isLoading = false

			endNavigation()
		}, 100)
	})

	$effect(() => {
		if (page.params.id) {
			isLoading = true
			setTimeout(() => {
				isLoading = false

				endNavigation()
			}, 100)
		}
	})
</script>

<div class="flex min-h-screen bg-gray-100">
	{#if !data?.error}
		<div class="w-64 bg-white shadow-md fixed h-screen">
			<div class="flex flex-col h-full">
				<div class="flex-grow overflow-y-auto">
					<nav class="px-4 py-6 space-y-2">
						<button
							type="button"
							class="flex items-center p-3 rounded-lg w-full text-left {currentPath === ''
								? 'bg-blue-100 text-blue-700'
								: 'hover:bg-gray-100'}"
							onclick={() => go('')}
							onkeydown={(e) => e.key === 'Enter' && go('')}
						>
							<span class="mr-3 text-xl">🏠</span>
							<span>基本設定</span>
						</button>
						<button
							class="flex items-center p-3 rounded-lg {currentPath === 'welcome'
								? 'bg-blue-100 text-blue-700'
								: 'hover:bg-gray-100'}"
							onclick={() => go('welcome')}
							onkeydown={(e) => e.key === 'Enter' && go('welcome')}
						>
							<span class="mr-3 text-xl">👋</span>
							<span>歡迎訊息</span>
						</button>
						<button
							class="flex items-center p-3 rounded-lg {currentPath === 'roles'
								? 'bg-blue-100 text-blue-700'
								: 'hover:bg-gray-100'}"
							onclick={() => go('roles')}
							onkeydown={(e) => e.key === 'Enter' && go('roles')}
						>
							<span class="mr-3 text-xl">🏷️</span>
							<span>身分組</span>
						</button>
						<button
							class="flex items-center p-3 rounded-lg {currentPath === 'lockvoice'
								? 'bg-blue-100 text-blue-700'
								: 'hover:bg-gray-100'}"
							onclick={() => go('lockvoice')}
							onkeydown={(e) => e.key === 'Enter' && go('lockvoice')}
						>
							<span class="mr-3 text-xl">🎙️</span>
							<span>鎖碼語音頻道</span>
						</button>
						<button
							class="flex items-center p-3 rounded-lg {currentPath === 'autovoice'
								? 'bg-blue-100 text-blue-700'
								: 'hover:bg-gray-100'}"
							onclick={() => go('autovoice')}
							onkeydown={(e) => e.key === 'Enter' && go('autovoice')}
						>
							<span class="mr-3 text-xl">🎙️</span>
							<span>自動語音頻道</span>
						</button>
						<button
							class="flex items-center p-3 rounded-lg {currentPath === 'features'
								? 'bg-blue-100 text-blue-700'
								: 'hover:bg-gray-100'}"
							onclick={() => go('features')}
							onkeydown={(e) => e.key === 'Enter' && go('features')}
						>
							<span class="mr-3 text-xl">⚙️</span>
							<span>其他功能</span>
						</button>
					</nav>
				</div>

				<div class="p-4 border-t border-gray-200 text-center sticky bottom-0 bg-white">
					<div class="font-bold">伺服器 ID</div>
					{#if guild?.guild_id}
						<div class="text-sm text-gray-500">
							{(() => {
								const highPart = BigInt(guild.guild_id.high) * BigInt(4294967296)
								const lowPart = BigInt(guild.guild_id.low >>> 0)
								return String(highPart + lowPart)
							})()}
						</div>
					{:else}
						<div class="text-sm text-gray-500">-</div>
					{/if}
				</div>
			</div>
		</div>

		<div class="ml-64 flex-grow p-6">
			{@render children()}
		</div>
	{:else}
		<div class="flex-grow p-6">
			{@render children()}
		</div>
	{/if}
</div>
