<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props()

	let guild = data.guild
	let welcome = { ...guild.welcome }
	let leave = { ...guild.leave }

	let welcomeEnabled = $state(Boolean(welcome.channel))
	let leaveEnabled = $state(Boolean(leave.channel))

	let saving = $state(false)
	let saveSuccess = $state(false)
	/**
	 * @type {null}
	 */
	let saveError = $state(null)

	let channels = $state(null)
	let loadingChannels = $state(false)
	let channelsError = $state(null)

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

	async function loadChannels() {
		if (channels) return

		loadingChannels = true
		channelsError = null

		try {
			const guildId = formatChannelId(guild.guild_id)
			const response = await fetch(`/api/getGuildChannels/${guildId}`)
			if (!response.ok) {
				throw new Error('無法載入頻道列表')
			}
			const data = await response.json()
			channels = data.channels
		} catch (error) {
			console.error('載入頻道失敗:', error)
			channelsError = error.message
		} finally {
			loadingChannels = false
		}
	}

	loadChannels()

	async function saveSettings() {
		saving = true
		saveSuccess = false
		saveError = null

		try {
			const guildId = formatChannelId(guild.guild_id)
			const response = await fetch(`/api/guild/${guildId}/welcome`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					welcome: {
						channel: welcomeEnabled ? welcome.channel : 0,
						message: welcome.message
					},
					leave: {
						channel: leaveEnabled ? leave.channel : 0,
						message: leave.message
					}
				})
			})

			if (!response.ok) {
				throw new Error('儲存設定失敗')
			}

			saveSuccess = true
			guild.welcome = {
				channel: welcomeEnabled ? welcome.channel : 0,
				message: welcome.message
			}

			guild.leave = {
				channel: leaveEnabled ? leave.channel : 0,
				message: leave.message
			}
		} catch (error) {
			console.error('保存設定錯誤:', error)
			saveError = error.message
		} finally {
			saving = false
			setTimeout(() => {
				saveSuccess = false
				saveError = null
			}, 5000)
		}
	}
</script>

<div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
	<header class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white">歡迎與離開訊息設定</h1>
		<p class="text-gray-600 dark:text-gray-300 mt-2">設定用戶加入或離開伺服器時的自動訊息</p>
	</header>

	{#if saveSuccess}
		<div class="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
			<div class="flex items-center">
				<i class="fas fa-check-circle mr-2"></i>
				<p class="font-medium">設定已成功儲存！</p>
			</div>
		</div>
	{/if}

	{#if saveError}
		<div class="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
			<div class="flex items-center">
				<i class="fas fa-exclamation-circle mr-2"></i>
				<p class="font-medium">{saveError}</p>
			</div>
		</div>
	{/if}

	<div class="mb-10">
		<h2 class="text-2xl font-semibold mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">歡迎訊息設定</h2>

		<div class="mb-6">
			<label class="inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					class="form-checkbox h-5 w-5 text-black dark:text-white rounded border-gray-300 focus:ring-black focus:ring-2"
					bind:checked={welcomeEnabled}
				/>
				<span class="ml-3 text-gray-700 dark:text-gray-300 font-medium">啟用歡迎訊息</span>
			</label>
		</div>

		<div class="grid grid-cols-1 gap-6 mb-8 transition-opacity duration-200 {!welcomeEnabled ? 'opacity-50' : ''}">
			<div>
				<label for="welcomeChannel" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
					>頻道選擇</label
				>
				{#if loadingChannels}
					<div class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
						<i class="fas fa-spinner fa-spin mr-2"></i>載入頻道中...
					</div>
				{:else if channelsError}
					<div class="w-full p-3 border border-red-300 rounded-lg bg-red-50 text-red-600">
						<i class="fas fa-exclamation-triangle mr-2"></i>{channelsError}
					</div>
				{:else if channels}
					<select
						bind:value={welcome.channel}
						disabled={!welcomeEnabled}
						class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
					>
						<option value="">請選擇頻道</option>
						{#each channels.text as channel}
							<option value={channel.id}># {channel.name}</option>
						{/each}
						{#each channels.announcement as channel}
							<option value={channel.id}># {channel.name} (公告)</option>
						{/each}
					</select>
				{:else}
					<div class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
						無法載入頻道列表
					</div>
				{/if}
				<p class="text-xs text-gray-500 dark:text-gray-400 mt-2">選擇歡迎訊息要發送的頻道</p>
			</div>

			<div>
				<label for="welcomeMessage" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
					>歡迎訊息</label
				>
				<textarea
					id="welcomeMessage"
					bind:value={welcome.message}
					placeholder="請輸入歡迎訊息"
					disabled={!welcomeEnabled}
					rows="4"
					class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
				></textarea>
				<div class="text-xs text-gray-500 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
					<p class="font-medium mb-2">可用的變數：</p>
					<ul class="list-disc list-inside ml-2 space-y-1">
						<li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{'{user}'}</code> - 顯示用戶名稱</li>
						<li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{'{server}'}</code> - 顯示伺服器名稱</li>
						<li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{'{mention}'}</code> - @提及用戶</li>
						<li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{'{count}'}</code> - 伺服器總人數</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="mb-10">
		<h2 class="text-2xl font-semibold mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">離開訊息設定</h2>

		<div class="mb-6">
			<label class="inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					class="form-checkbox h-5 w-5 text-black dark:text-white rounded border-gray-300 focus:ring-black focus:ring-2"
					bind:checked={leaveEnabled}
				/>
				<span class="ml-3 text-gray-700 dark:text-gray-300 font-medium">啟用離開訊息</span>
			</label>
		</div>

		<div class="grid grid-cols-1 gap-6 mb-8 transition-opacity duration-200 {!leaveEnabled ? 'opacity-50' : ''}">
			<div>
				<label for="leaveChannel" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
					>頻道選擇</label
				>
				{#if loadingChannels}
					<div class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
						<i class="fas fa-spinner fa-spin mr-2"></i>載入頻道中...
					</div>
				{:else if channelsError}
					<div class="w-full p-3 border border-red-300 rounded-lg bg-red-50 text-red-600">
						<i class="fas fa-exclamation-triangle mr-2"></i>{channelsError}
					</div>
				{:else if channels}
					<select
						bind:value={leave.channel}
						disabled={!leaveEnabled}
						class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
					>
						<option value="">請選擇頻道</option>
						{#each channels.text as channel}
							<option value={channel.id}># {channel.name}</option>
						{/each}
						{#each channels.announcement as channel}
							<option value={channel.id}># {channel.name} (公告)</option>
						{/each}
					</select>
				{:else}
					<div class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
						無法載入頻道列表
					</div>
				{/if}
				<p class="text-xs text-gray-500 dark:text-gray-400 mt-2">選擇離開訊息要發送的頻道</p>
			</div>

			<div>
				<label for="leaveMessage" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
					>離開訊息</label
				>
				<textarea
					id="leaveMessage"
					bind:value={leave.message}
					placeholder="請輸入離開訊息"
					disabled={!leaveEnabled}
					rows="4"
					class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
				></textarea>
				<div class="text-xs text-gray-500 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
					<p class="font-medium mb-2">可用的變數：</p>
					<ul class="list-disc list-inside ml-2 space-y-1">
						<li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{'{user}'}</code> - 顯示用戶名稱</li>
						<li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{'{server}'}</code> - 顯示伺服器名稱</li>
						<li><code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{'{count}'}</code> - 離開後的伺服器總人數</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
		<button
			class="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
			onclick={saveSettings}
			disabled={saving}
		>
			{#if saving}
				<i class="fas fa-spinner fa-spin mr-2"></i>儲存中...
			{:else}
				<i class="fas fa-save mr-2"></i>儲存設定
			{/if}
		</button>
	</div>
</div>
