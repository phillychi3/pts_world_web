<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props()

	const guild = data.guild
	let autovoiceChannels = [...(guild.autovoice || [])]

	// 頁面狀態
	let newChannelId = $state('')
	let saving = $state(false)
	let saveSuccess = $state(false)
	let saveError = $state(null)
	let showAddForm = $state(false)

	let channels = $state(null)
	let loadingChannels = $state(false)
	let channelsError = $state(null)

	// 將大整數頻道 ID 轉換為字符串
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

	let formattedChannels = autovoiceChannels.map((channel) => formatChannelId(channel))

	function addChannel() {
		if (!newChannelId.trim()) {
			saveError = '請選擇頻道'
			return
		}

		if (formattedChannels.includes(newChannelId.trim())) {
			saveError = '此頻道已在列表中'
			return
		}

		formattedChannels.push(newChannelId.trim())

		saveChanges()

		newChannelId = ''
		showAddForm = false
	}

	function deleteChannel(index) {
		if (confirm('確定要刪除此自動語音頻道嗎？')) {
			autovoiceChannels.splice(index, 1)
			autovoiceChannels = [...autovoiceChannels]
			saveChanges()
		}
	}

	async function saveChanges() {
		saving = true
		saveSuccess = false
		saveError = null

		try {
			const guildId = formatChannelId(guild.guild_id)
			const response = await fetch(`/api/nothing/guild/${guildId}/autovoice`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					channelIds: formattedChannels
				})
			})

			if (!response.ok) {
				throw new Error('儲存設定失敗')
			}

			const result = await response.json()

			if (result.autovoice) {
				autovoiceChannels = result.autovoice
				guild.autovoice = [...autovoiceChannels]
				formattedChannels = autovoiceChannels.map((channel) => formatChannelId(channel))
			}

			saveSuccess = true
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
		<h1 class="text-2xl font-bold text-gray-800">自動語音頻道管理</h1>
		<p class="text-gray-600 dark:text-gray-300 mt-2">設定當用戶加入這些頻道時，自動為其創建語音頻道</p>
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

	<!-- 現有自動語音頻道列表 -->
	<div class="mb-8">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-semibold">已設定的頻道</h2>
			<button
				class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
				on:click={() => (showAddForm = true)}
			>
				新增頻道
			</button>
		</div>

		{#if formattedChannels.length === 0}
			<p class="text-gray-500 italic">尚未設定任何自動語音頻道</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="min-w-full bg-white">
					<thead>
						<tr class="bg-gray-50 border-b">
							<th class="text-left py-2 px-4 font-medium text-gray-700">頻道 ID</th>
							<th class="text-right py-2 px-4 font-medium text-gray-700">操作</th>
						</tr>
					</thead>
					<tbody>
						{#each formattedChannels as channelId, index}
							<tr class="border-b">
								<td class="py-2 px-4">{channelId}</td>
								<td class="py-2 px-4 text-right">
									<button
										class="text-red-600 hover:text-red-800"
										on:click={() => deleteChannel(index)}
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

	<!-- 添加新頻道表單 -->
	{#if showAddForm}
		<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
			<h3 class="text-lg font-medium mb-4">新增自動語音頻道</h3>

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
				<p class="text-xs text-gray-500 mt-1">用戶加入此頻道後會自動創建個人語音頻道</p>
			</div>

			<div class="flex justify-end space-x-3 mt-6">
				<button
					class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					on:click={() => (showAddForm = false)}
				>
					取消
				</button>
				<button
					class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
					on:click={addChannel}
					disabled={saving}
				>
					{saving ? '儲存中...' : '儲存'}
				</button>
			</div>
		</div>
	{/if}
</div>
