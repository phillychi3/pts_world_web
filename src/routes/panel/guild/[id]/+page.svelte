<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props()

	const guild = data.guild

	let channels = $state(null)
	let loadingChannels = $state(false)

	function formatChannelId(channel) {
		if (!channel) return ''
		if (typeof channel === 'string') return channel

		try {
			const highPart = BigInt(channel.high) * BigInt(4294967296)
			const lowPart = BigInt(channel.low >>> 0)
			return String(highPart + lowPart)
		} catch (error) {
			console.error('轉換頻道 ID 錯誤:', error)
			return ''
		}
	}

	function getChannelName(channelId) {
		if (!channels || !channelId) return channelId || '未設定'

		const allChannels = [
			...channels.text,
			...channels.voice,
			...channels.announcement,
			...channels.forum
		]

		const channel = allChannels.find((ch) => ch.id === channelId)
		return channel ? channel.name : channelId
	}

	async function loadChannels() {
		if (channels || loadingChannels) return

		loadingChannels = true
		try {
			const response = await fetch(`/api/getGuildChannels/${formatChannelId(guild.guild_id)}`)
			if (response.ok) {
				const data = await response.json()
				channels = data.channels
			}
		} catch (error) {
			console.error('載入頻道失敗:', error)
		} finally {
			loadingChannels = false
		}
	}

	loadChannels()

	console.log(guild)
</script>

<div class="bg-white rounded-lg shadow-md p-6">
	<header class="mb-6">
		<h1 class="text-2xl font-bold text-gray-800">伺服器狀態概覽</h1>
		<p class="text-gray-600">查看當前伺服器的所有設定</p>
	</header>

	{#if data.error}
		{#if data.error === 'Guild not found'}
			<div class="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
				<p class="mb-2">機器人尚未加入伺服器</p>
				<a
					href="https://discord.com/oauth2/authorize?client_id=1044529058689593435&permissions=1641549393014&scope=bot%20applications.commands"
					target="_blank"
					class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100"
				>
					邀請機器人
				</a>
			</div>
		{:else}
			<div class="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
				<p>{data.error}</p>
			</div>
		{/if}
	{:else}
		<div class="mb-8">
			<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">基本設定</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">伺服器狀態</h3>
					<div class="mt-2 grid grid-cols-2 gap-2">
						<div class="flex items-center">
							<span class="mr-2 w-3 h-3 rounded-full {guild.ispro ? 'bg-green-500' : 'bg-gray-300'}"
							></span>
							<span>專業版</span>
						</div>
						<div class="flex items-center">
							<span
								class="mr-2 w-3 h-3 rounded-full {guild.User_Activity
									? 'bg-green-500'
									: 'bg-gray-300'}"
							></span>
							<span>用戶活動記錄</span>
						</div>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">連結修正功能</h3>
					<div class="mt-2 grid grid-cols-2 gap-2">
						<div class="flex items-center">
							<span
								class="mr-2 w-3 h-3 rounded-full {guild.isfixtwitter
									? 'bg-green-500'
									: 'bg-gray-300'}"
							></span>
							<span>Twitter 連結</span>
						</div>
						<div class="flex items-center">
							<span
								class="mr-2 w-3 h-3 rounded-full {guild.isfixnhentai
									? 'bg-green-500'
									: 'bg-gray-300'}"
							></span>
							<span>nhentai 連結</span>
						</div>
						<div class="flex items-center">
							<span
								class="mr-2 w-3 h-3 rounded-full {guild.isfixpixiv
									? 'bg-green-500'
									: 'bg-gray-300'}"
							></span>
							<span>Pixiv 連結</span>
						</div>
						<div class="flex items-center">
							<span
								class="mr-2 w-3 h-3 rounded-full {guild.isfixex ? 'bg-green-500' : 'bg-gray-300'}"
							></span>
							<span>E(x)hentai 連結</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-8">
			<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">安全設定</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">蜜罐</h3>
					<div class="flex items-center">
						<span
							class="mr-2 w-3 h-3 rounded-full {guild.xaoc2.honeypot.enabled
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span>是否啟用</span>
						<span class="ml-4 text-sm text-gray-500"
							>頻道 ID: {formatChannelId(guild.xaoc2.honeypot.channel_id) || '未設定'}</span
						>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">隔離區</h3>
					<div class="flex items-center">
						<span
							class="mr-2 w-3 h-3 rounded-full {guild.xaoc2.quarantine.enabled
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">user install spam</h3>
					<div class="flex items-center">
						<span
							class="mr-2 w-3 h-3 rounded-full {guild.xaoc2.userinstallspam.enabled
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">4fish</h3>
					<div class="flex items-center">
						<span
							class="mr-2 w-3 h-3 rounded-full {guild.xaoc2['4fish'].enabled
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">垃圾訊息檢測</h3>
					<div class="flex items-center">
						<span
							class="mr-2 w-3 h-3 rounded-full {guild.xaoc2.spam_detection.enabled
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">釣魚檢測</h3>
					<div class="flex items-center">
						<span
							class="mr-2 w-3 h-3 rounded-full {guild.anti_fish ? 'bg-green-500' : 'bg-gray-300'}"
						></span>
						<span>是否啟用</span>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-8">
			<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">紀錄設定</h2>
			<div class="bg-gray-50 p-4 rounded-lg">
				<div class="mb-4">
					<h3 class="font-medium text-gray-700 mb-2 flex items-center">
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
							></path>
						</svg>
						紀錄頻道
					</h3>
					<p class="text-sm text-gray-600 bg-white px-3 py-2 rounded border border-gray-200">
						{getChannelName(formatChannelId(guild.log_config.channel_id))} {formatChannelId(guild.log_config.channel_id)}
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.member_join_leave
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">會員加入/離開</span>
					</div>

					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.message_delete
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">訊息刪除</span>
					</div>

					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.message_edit
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">訊息編輯</span>
					</div>

					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.voice_join_leave
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">語音頻道加入/離開</span>
					</div>

					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.voice_stream
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">語音直播紀錄</span>
					</div>

					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.voice_event
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">語音事件</span>
					</div>

					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.role_update
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">身分組更新</span>
					</div>

					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.channel_update
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">頻道更新</span>
					</div>

					<div class="flex items-center bg-white px-3 py-2 rounded border border-gray-200">
						<span
							class="mr-3 w-3 h-3 rounded-full {guild.log_config.guild_update
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span class="text-sm text-gray-700">伺服器更新</span>
					</div>
				</div>
			</div>
		</div>
		<div class="mb-8">
			<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">訊息設定</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">歡迎訊息</h3>
					<div class="flex items-center">
						<span
							class="mr-2 w-3 h-3 rounded-full {guild.welcome.channel
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">離開訊息</h3>
					<div class="flex items-center">
						<span
							class="mr-2 w-3 h-3 rounded-full {guild.leave.channel
								? 'bg-green-500'
								: 'bg-gray-300'}"
						></span>
						<span>是否啟用</span>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-8">
			<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">動漫通知設定</h2>
			<div class="bg-gray-50 p-4 rounded-lg">
				<div class="flex items-center mb-2">
					<span
						class="mr-2 w-3 h-3 rounded-full {guild.anime.is_enabled
							? 'bg-green-500'
							: 'bg-gray-300'}"
					></span>
					<span class="font-medium">{guild.anime.is_enabled ? '已啟用' : '未啟用'}</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
					<div>
						<p class="text-sm text-gray-600">
							頻道: {getChannelName(formatChannelId(guild.anime.channel))}
						</p>
					</div>
					<div>
						<p class="text-sm text-gray-600">
							Webhook: {guild.anime.webhook ? '已設定' : '未設定'}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-8">
			<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">身分組下拉選單</h2>
			{#if Object.keys(guild.role_dropdown || {}).length > 0}
				<div class="space-y-4">
					{#each Object.entries(guild.role_dropdown) as [key, dropdown]}
						<div class="bg-gray-50 p-4 rounded-lg">
							<h3 class="font-medium text-gray-700">{dropdown.listname}</h3>
							<p class="text-sm text-gray-600">
								頻道 ID: {formatChannelId(dropdown.channel_id)}
							</p>
							<div class="mt-2">
								<p class="text-sm font-medium">身分組列表 ({dropdown.roles.length})</p>
								<div
									class="mt-1 bg-white p-2 rounded border border-gray-200 max-h-40 overflow-y-auto"
								>
									{#each dropdown.roles as role}
										<div class="flex items-center py-1 border-b border-gray-100 last:border-0">
											<span class="mr-2">{role.emoji || '🏷️'}</span>
											<span>{role.label}</span>
											<span class="ml-auto text-xs text-gray-500">{role.value}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-500 italic">尚未設定身分組下拉選單</p>
			{/if}
		</div>

		<div>
			<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">其他設定</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">TTS 語音功能</h3>
					<div class="mt-2">
						<div class="flex items-center">
							<span
								class="mr-2 w-3 h-3 rounded-full {guild.tts?.is_enabled
									? 'bg-green-500'
									: 'bg-gray-300'}"
							></span>
							<span>{guild.tts?.is_enabled ? '已啟用' : '未啟用'}</span>
						</div>
						<p class="text-sm text-gray-600 mt-1">頻道 ID: {guild.tts?.channel || '未設定'}</p>
						<p class="text-sm text-gray-600 mt-1">已授權用戶: {guild.tts?.users?.length || 0} 位</p>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">Daily Wife 功能</h3>
					<div class="mt-2">
						<p class="text-sm text-gray-600 mt-1">
							已登記的 wife 數量: {Object.keys(guild.Daily_wife || {}).length}
						</p>
						<p class="text-sm text-gray-600 mt-1">
							禁用用戶數量: {guild.Disable_wife_users?.length || 0}
						</p>
					</div>
				</div>
				<div class="bg-gray-50 p-4 rounded-lg">
					<h3 class="font-medium text-gray-700">R18</h3>
					<div class="mt-2">
						<div class="flex items-center">
							<span class="mr-2 w-3 h-3 rounded-full {guild.r18on ? 'bg-green-500' : 'bg-gray-300'}"
							></span>
							<span>R18 {guild.r18on ? '已啟用' : '未啟用'}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
