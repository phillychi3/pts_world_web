<script>
	import { goto } from '$app/navigation'
	import { startNavigation } from '$lib/stores/navigation'
	const { data } = $props()

	const discordGuilds = $derived(data.discordGuilds || [])
	const hasGuilds = $derived(discordGuilds.length > 0)

	/**
	 * @param {{ id: any; }} guild
	 */
	async function gotoguild(guild) {
		// 在導航前啟動載入動畫
		startNavigation()
		// 執行導航
		await goto(`/panel/guild/${guild.id}`)
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 tracking-tight">
			Discord 伺服器清單
		</h1>

		{#if data.error}
			<div
				class="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-8 max-w-2xl mx-auto shadow-sm"
			>
				<p class="font-medium">{data.error}</p>
			</div>
		{/if}

		{#if hasGuilds}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
			>
				{#each discordGuilds as guild}
					{#if guild.isAdmin || guild.owner}
						<div
							class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
						>
							<div class="flex items-center mb-4">
								{#if guild.icon}
									<img
										src={guild.icon}
										alt="{guild.name} icon"
										class="w-12 h-12 rounded-full mr-3 object-cover ring-2 ring-gray-200"
									/>
								{:else}
									<div
										class="w-12 h-12 rounded-full mr-3 bg-indigo-500 text-white flex items-center justify-center font-bold text-lg ring-2 ring-gray-200"
									>
										{guild.name.substring(0, 2).toUpperCase()}
									</div>
								{/if}
								<h3 class="text-lg font-semibold text-gray-900 truncate flex-1">{guild.name}</h3>
							</div>
							<div class="flex flex-wrap gap-2 mb-6">
								{#if guild.owner}
									<span
										class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full border border-yellow-200"
									>
										伺服器擁有者
									</span>
								{/if}
								{#if guild.isAdmin}
									<span
										class="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full border border-indigo-200"
									>
										管理員
									</span>
								{/if}
							</div>
							<div class="flex justify-end">
								<button
									class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
									onclick={() => gotoguild(guild)}
								>
									查看詳情
								</button>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="text-center py-16 max-w-2xl mx-auto">
				<div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
					<div class="text-6xl mb-6">🤖</div>
					<p class="text-xl text-gray-600 mb-6 leading-relaxed">
						尚未加入任何 Discord 伺服器，或尚未授權存取伺服器資訊。
					</p>
					{#if !data.user?.discord?.authenticated}
						<a
							href="/api/auth/discord"
							class="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
						>
							使用 Discord 登入
						</a>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
