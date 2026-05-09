<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props()

	let guild = data.guild
	let lockvoice = guild.lockvoice || {}

	let editingChannel = $state(null)
	let newChannelId = $state('')
	let newPassword = $state('')
	let newAlarmChannel = $state('')
	let newTargetChannel = $state('')

	let isAdding = $state(false)
	let saving = $state(false)
	let saveSuccess = $state(false)
	let saveError = $state(null)

	let channels = $state(null)
	let loadingChannels = $state(false)
	let channelsError = $state(null)

	/**
	 * @param {{ high: string | number | bigint | boolean; low: number; }} channel
	 */
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

	let channelList = Object.keys(lockvoice).map((id) => ({
		id,
		password: lockvoice[id].password,
		alarmChannel: formatChannelId(lockvoice[id].alarmchannel),
		targetChannel: formatChannelId(lockvoice[id].targetchannel)
	}))

	function editChannel(channel) {
		editingChannel = channel.id
		newPassword = channel.password
		newAlarmChannel = channel.alarmChannel
		newTargetChannel = channel.targetChannel
		isAdding = false
	}

	function startAddChannel() {
		editingChannel = null
		newChannelId = ''
		newPassword = ''
		newAlarmChannel = ''
		newTargetChannel = ''
		isAdding = true
	}

	function cancelEdit() {
		editingChannel = null
		isAdding = false
	}

	function deleteChannel(channelId) {
		if (confirm('確定要刪除此鎖碼語音頻道設定嗎？')) {
			delete lockvoice[channelId]
			saveChanges()
		}
	}

	function saveChannel() {
		const channelId = editingChannel || newChannelId

		if (!channelId) {
			saveError = '請輸入頻道 ID'
			return
		}

		if (!newPassword) {
			saveError = '請輸入密碼'
			return
		}

		lockvoice[channelId] = {
			password: newPassword,
			alarmchannel: newAlarmChannel,
			targetchannel: newTargetChannel
		}

		saveChanges()

		editingChannel = null
		isAdding = false
	}

	async function saveChanges() {
		saving = true
		saveSuccess = false
		saveError = null

		try {
			const guildId = formatChannelId(guild.guild_id)
			const response = await fetch(`/api/nothing/guild/${guildId}/lockvoice`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					lockvoice
				})
			})

			if (!response.ok) {
				throw new Error('儲存設定失敗')
			}

			saveSuccess = true
			guild.lockvoice = { ...lockvoice }
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

<div>
	<header class="mb-6">
		<h1 class="text-2xl font-bold text-gray-800">鎖碼語音頻道管理</h1>
		<p class="text-gray-600 dark:text-gray-300 mt-2">管理需要密碼才能進入的語音頻道</p>
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

	<!-- 現有鎖碼語音頻道列表 -->
	<div class="mb-8">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-semibold">設定的頻道</h2>
			<button
				class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
				onclick={startAddChannel}
			>
				新增頻道
			</button>
		</div>

		{#if channelList.length === 0}
			<p class="text-gray-500 italic">尚未設定任何鎖碼語音頻道</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="min-w-full bg-white">
					<thead>
						<tr class="bg-gray-50 border-b">
							<th class="text-left py-2 px-4 font-medium text-gray-700">頻道 ID</th>
							<th class="text-left py-2 px-4 font-medium text-gray-700">密碼</th>
							<th class="text-left py-2 px-4 font-medium text-gray-700">通知頻道</th>
							<th class="text-left py-2 px-4 font-medium text-gray-700">目標頻道</th>
							<th class="text-right py-2 px-4 font-medium text-gray-700">操作</th>
						</tr>
					</thead>
					<tbody>
						{#each channelList as channel}
							<tr class="border-b">
								<td class="py-2 px-4">{channel.id}</td>
								<td class="py-2 px-4">{channel.password}</td>
								<td class="py-2 px-4">{channel.alarmChannel || '無'}</td>
								<td class="py-2 px-4">{channel.targetChannel || '無'}</td>
								<td class="py-2 px-4 text-right">
									<button
										class="text-blue-600 hover:text-blue-800 mr-2"
										onclick={() => editChannel(channel)}
									>
										編輯
									</button>
									<button
										class="text-red-600 hover:text-red-800"
										onclick={() => deleteChannel(channel.id)}
									>
										刪除
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>

	<!-- 編輯或添加頻道表單 -->
	{#if isAdding || editingChannel}
		<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
			<h3 class="text-lg font-medium mb-4">{isAdding ? '新增鎖碼語音頻道' : '編輯鎖碼語音頻道'}</h3>

			{#if isAdding}
				<div class="mb-4">
					<label for="channelId" class="block text-sm font-medium text-gray-700 mb-1">
						語音頻道選擇 <span class="text-red-500">*</span>
					</label>
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
							bind:value={newChannelId}
							class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">請選擇語音頻道</option>
							{#each channels.voice as channel}
								<option value={channel.id}>🔊 {channel.name}</option>
							{/each}
						</select>
					{:else}
						<div class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
							無法載入頻道列表
						</div>
					{/if}
					<p class="text-xs text-gray-500 mt-1">需要加密的語音頻道</p>
				</div>
			{/if}

			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-700 mb-1">
					密碼 <span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="password"
					bind:value={newPassword}
					placeholder="請輸入密碼"
					class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
				/>
				<p class="text-xs text-gray-500 mt-1">進入頻道需要的密碼</p>
			</div>

			<div class="mb-4">
				<label for="alarmChannel" class="block text-sm font-medium text-gray-700 mb-1">
					通知頻道
				</label>
				{#if channels}
					<select
						bind:value={newAlarmChannel}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="">請選擇通知頻道 (選填)</option>
						{#each channels.text as channel}
							<option value={channel.id}># {channel.name}</option>
						{/each}
						{#each channels.announcement as channel}
							<option value={channel.id}># {channel.name} (公告)</option>
						{/each}
					</select>
				{:else}
					<div class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
						載入頻道中...
					</div>
				{/if}
				<p class="text-xs text-gray-500 mt-1">嘗試進入失敗時發送通知的頻道</p>
			</div>

			<div class="mb-4">
				<label for="targetChannel" class="block text-sm font-medium text-gray-700 mb-1">
					目標頻道
				</label>
				{#if channels}
					<select
						bind:value={newTargetChannel}
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="">請選擇目標語音頻道 (選填)</option>
						{#each channels.voice as channel}
							<option value={channel.id}>🔊 {channel.name}</option>
						{/each}
					</select>
				{:else}
					<div class="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
						載入頻道中...
					</div>
				{/if}
				<p class="text-xs text-gray-500 mt-1">成功驗證後移動用戶到的頻道</p>
			</div>

			<div class="flex justify-end space-x-3 mt-6">
				<button
					class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					onclick={cancelEdit}
				>
					取消
				</button>
				<button
					class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
					onclick={saveChannel}
					disabled={saving}
				>
					{saving ? '儲存中...' : '儲存'}
				</button>
			</div>
		</div>
	{/if}

	<div class="mt-8 border-t border-gray-200 pt-4">
		<h3 class="text-lg font-medium mb-2">關於鎖碼語音頻道</h3>
		<p class="text-gray-600 dark:text-gray-300">鎖碼語音頻道功能允許您設定需要密碼才能進入的語音頻道。</p>
	</div>
</div>
