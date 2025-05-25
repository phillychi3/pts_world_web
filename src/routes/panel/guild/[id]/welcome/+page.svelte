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

<div class="bg-white rounded-lg shadow-md p-6">
	<header class="mb-6">
		<h1 class="text-2xl font-bold text-gray-800">歡迎與離開訊息設定</h1>
		<p class="text-gray-600">設定用戶加入或離開伺服器時的自動訊息</p>
	</header>

	{#if saveSuccess}
		<div class="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
			<p>設定已成功儲存！</p>
		</div>
	{/if}

	{#if saveError}
		<div class="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
			<p>{saveError}</p>
		</div>
	{/if}

	<div class="mb-8">
		<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">歡迎訊息設定</h2>

		<div class="mb-4">
			<label class="inline-flex items-center">
				<input
					type="checkbox"
					class="form-checkbox h-5 w-5 text-blue-600"
					bind:checked={welcomeEnabled}
				/>
				<span class="ml-2 text-gray-700">啟用歡迎訊息</span>
			</label>
		</div>

		<div class="grid grid-cols-1 gap-4 mb-6 {!welcomeEnabled ? 'opacity-50' : ''}">
			<div>
				<label for="welcomeChannel" class="block text-sm font-medium text-gray-700 mb-1"
					>頻道選擇</label
				>
				{#if loadingChannels}
					<div class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
						載入頻道中...
					</div>
				{:else if channelsError}
					<div class="w-full p-2 border border-red-300 rounded-md bg-red-50 text-red-500">
						{channelsError}
					</div>
				{:else if channels}
					<select
						bind:value={welcome.channel}
						disabled={!welcomeEnabled}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
					<div class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
						無法載入頻道列表
					</div>
				{/if}
				<p class="text-xs text-gray-500 mt-1">選擇歡迎訊息要發送的頻道</p>
			</div>

			<div>
				<label for="welcomeMessage" class="block text-sm font-medium text-gray-700 mb-1"
					>歡迎訊息</label
				>
				<textarea
					id="welcomeMessage"
					bind:value={welcome.message}
					placeholder="請輸入歡迎訊息"
					disabled={!welcomeEnabled}
					rows="3"
					class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
				></textarea>
				<div class="text-xs text-gray-500 mt-1">
					<p>可用的變數：</p>
					<ul class="list-disc list-inside ml-2">
						<li>{'{user}'} - 顯示用戶名稱</li>
						<li>{'{server}'} - 顯示伺服器名稱</li>
						<li>{'{mention}'} - @提及用戶</li>
						<li>{'{count}'} - 伺服器總人數</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="mb-8">
		<h2 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">離開訊息設定</h2>

		<div class="mb-4">
			<label class="inline-flex items-center">
				<input
					type="checkbox"
					class="form-checkbox h-5 w-5 text-blue-600"
					bind:checked={leaveEnabled}
				/>
				<span class="ml-2 text-gray-700">啟用離開訊息</span>
			</label>
		</div>

		<div class="grid grid-cols-1 gap-4 mb-6 {!leaveEnabled ? 'opacity-50' : ''}">
			<div>
				<label for="leaveChannel" class="block text-sm font-medium text-gray-700 mb-1"
					>頻道選擇</label
				>
				{#if loadingChannels}
					<div class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
						載入頻道中...
					</div>
				{:else if channelsError}
					<div class="w-full p-2 border border-red-300 rounded-md bg-red-50 text-red-500">
						{channelsError}
					</div>
				{:else if channels}
					<select
						bind:value={leave.channel}
						disabled={!leaveEnabled}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
					<div class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
						無法載入頻道列表
					</div>
				{/if}
				<p class="text-xs text-gray-500 mt-1">選擇離開訊息要發送的頻道</p>
			</div>

			<div>
				<label for="leaveMessage" class="block text-sm font-medium text-gray-700 mb-1"
					>離開訊息</label
				>
				<textarea
					id="leaveMessage"
					bind:value={leave.message}
					placeholder="請輸入離開訊息"
					disabled={!leaveEnabled}
					rows="3"
					class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
				></textarea>
				<div class="text-xs text-gray-500 mt-1">
					<p>可用的變數：</p>
					<ul class="list-disc list-inside ml-2">
						<li>{'{user}'} - 顯示用戶名稱</li>
						<li>{'{server}'} - 顯示伺服器名稱</li>
						<li>{'{count}'} - 離開後的伺服器總人數</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="flex justify-end">
		<button
			class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
			onclick={saveSettings}
			disabled={saving}
		>
			{#if saving}
				儲存中...
			{:else}
				儲存設定
			{/if}
		</button>
	</div>
</div>
