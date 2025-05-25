<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props()

	const guild = data.guild
	let roleDropdowns = guild.role_dropdown || {}

	let editingDropdown = $state(null)
	let newDropdownId = $state('')
	let newChannelId = $state('')
	let newListName = $state('')

	let editingRoleIndex = $state(-1)
	let newRoleLabel = $state('')
	let newRoleValue = $state('')
	let newRoleEmoji = $state('')

	let isAdding = $state(false)
	let isAddingRole = $state(false)
	let saving = $state(false)
	let saveSuccess = $state(false)
	let saveError = $state(null)

	let channels = $state(null)
	let loadingChannels = $state(false)
	let channelsError = $state(null)

	// @ts-ignore
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

	let dropdowns = Object.keys(roleDropdowns).map((id) => ({
		id,
		channelId: formatChannelId(roleDropdowns[id].channel_id),
		listName: roleDropdowns[id].listname,
		roles: roleDropdowns[id].roles || []
	}))

	// @ts-ignore
	function editDropdown(dropdown) {
		editingDropdown = dropdown.id
		newChannelId = dropdown.channelId
		newListName = dropdown.listName
		isAdding = false
		editingRoleIndex = -1
		isAddingRole = false
	}

	function startAddDropdown() {
		editingDropdown = null
		newDropdownId = ''
		newChannelId = ''
		newListName = ''
		isAdding = true
		editingRoleIndex = -1
		isAddingRole = false
	}

	function cancelEdit() {
		editingDropdown = null
		isAdding = false
		editingRoleIndex = -1
		isAddingRole = false
	}

	// @ts-ignore
	function deleteDropdown(dropdownId) {
		if (confirm('確定要刪除此身分組下拉選單嗎？')) {
			delete roleDropdowns[dropdownId]
			saveChanges()
		}
	}

	// @ts-ignore
	function editRole(dropdown, index) {
		if (editingDropdown !== dropdown.id) {
			editDropdown(dropdown)
		}

		editingRoleIndex = index
		isAddingRole = false

		const role = dropdown.roles[index]
		newRoleLabel = role.label
		newRoleValue = role.value
		newRoleEmoji = role.emoji
	}

	// @ts-ignore
	function startAddRole(dropdown) {
		if (editingDropdown !== dropdown.id) {
			editDropdown(dropdown)
		}

		editingRoleIndex = -1
		isAddingRole = true
		newRoleLabel = ''
		newRoleValue = ''
		newRoleEmoji = ''
	}

	// @ts-ignore
	function deleteRole(dropdown, index) {
		if (confirm('確定要刪除此身分組選項嗎？')) {
			const roles = [...roleDropdowns[dropdown.id].roles]
			roles.splice(index, 1)
			roleDropdowns[dropdown.id].roles = roles
			saveChanges()
		}
	}

	function saveDropdown() {
		const dropdownId = editingDropdown || newDropdownId

		if (!dropdownId) {
			// @ts-ignore
			saveError = '請輸入下拉選單 ID'
			return
		}

		if (!newChannelId) {
			// @ts-ignore
			saveError = '請輸入頻道 ID'
			return
		}

		if (!newListName) {
			// @ts-ignore
			saveError = '請輸入列表名稱'
			return
		}

		if (isAdding) {
			roleDropdowns[dropdownId] = {
				channel_id: newChannelId,
				listname: newListName,
				roles: []
			}
		} else {
			// @ts-ignore
			roleDropdowns[editingDropdown].channel_id = newChannelId
			// @ts-ignore
			roleDropdowns[editingDropdown].listname = newListName
		}

		saveChanges()

		isAdding = false
		// @ts-ignore
		editingDropdown = dropdownId
	}

	function saveRole() {
		if (!newRoleLabel) {
			// @ts-ignore
			saveError = '請輸入標籤'
			return
		}

		if (!newRoleValue) {
			// @ts-ignore
			saveError = '請輸入身分組 ID'
			return
		}

		const role = {
			label: newRoleLabel,
			value: newRoleValue,
			emoji: newRoleEmoji
		}

		if (isAddingRole) {
			// @ts-ignore
			if (!roleDropdowns[editingDropdown].roles) {
				// @ts-ignore
				roleDropdowns[editingDropdown].roles = []
			}
			// @ts-ignore
			roleDropdowns[editingDropdown].roles.push(role)
		} else {
			// @ts-ignore
			roleDropdowns[editingDropdown].roles[editingRoleIndex] = role
		}

		saveChanges()

		editingRoleIndex = -1
		isAddingRole = false
	}

	async function saveChanges() {
		saving = true
		saveSuccess = false
		saveError = null

		try {
			const guildId = formatChannelId(guild.guild_id)
			const response = await fetch(`/api/guild/${guildId}/role-dropdown`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					role_dropdown: roleDropdowns
				})
			})

			if (!response.ok) {
				throw new Error('儲存設定失敗')
			}

			saveSuccess = true
			guild.role_dropdown = { ...roleDropdowns }
		} catch (error) {
			console.error('保存設定錯誤:', error)
			// @ts-ignore
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
		<h1 class="text-2xl font-bold text-gray-800">身分組下拉選單管理</h1>
		<p class="text-gray-600">創建和管理可讓用戶自選身分組的下拉選單</p>
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

	<!-- 現有下拉選單列表 -->
	<div class="mb-8">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-semibold">已設定的下拉選單</h2>
			<button
				class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
				on:click={startAddDropdown}
			>
				新增下拉選單
			</button>
		</div>

		{#if dropdowns.length === 0}
			<p class="text-gray-500 italic">尚未設定任何身分組下拉選單</p>
		{:else}
			<div class="space-y-6">
				{#each dropdowns as dropdown}
					<div class="border rounded-lg p-4 bg-gray-50">
						<div class="flex justify-between items-start mb-3">
							<div>
								<h3 class="font-medium text-lg">{dropdown.listName}</h3>
								<div class="text-sm text-gray-600">
									<p>選單 ID: {dropdown.id}</p>
									<p>頻道 ID: {dropdown.channelId}</p>
								</div>
							</div>
							<div class="flex space-x-2">
								<button
									class="text-blue-600 hover:text-blue-800 text-sm"
									on:click={() => editDropdown(dropdown)}
								>
									編輯選單
								</button>
								<button
									class="text-red-600 hover:text-red-800 text-sm"
									on:click={() => deleteDropdown(dropdown.id)}
								>
									刪除選單
								</button>
							</div>
						</div>

						<div class="mt-4">
							<div class="flex justify-between items-center mb-2">
								<h4 class="font-medium">身分組選項</h4>
								{#if editingDropdown === dropdown.id && !isAddingRole && editingRoleIndex === -1}
									<button
										class="text-sm text-blue-600 hover:text-blue-800"
										on:click={() => startAddRole(dropdown)}
									>
										新增身分組
									</button>
								{/if}
							</div>

							{#if dropdown.roles && dropdown.roles.length > 0}
								<div class="overflow-x-auto">
									<table class="min-w-full bg-white">
										<thead>
											<tr class="bg-gray-100 border-b">
												<th class="text-left py-2 px-3 text-xs font-medium text-gray-700"
													>表情符號</th
												>
												<th class="text-left py-2 px-3 text-xs font-medium text-gray-700">標籤</th>
												<th class="text-left py-2 px-3 text-xs font-medium text-gray-700"
													>身分組 ID</th
												>
												<th class="text-right py-2 px-3 text-xs font-medium text-gray-700">操作</th>
											</tr>
										</thead>
										<tbody>
											{#each dropdown.roles as role, index}
												<tr class="border-b">
													<td class="py-2 px-3">{role.emoji || '無'}</td>
													<td class="py-2 px-3">{role.label}</td>
													<td class="py-2 px-3">{role.value}</td>
													<td class="py-2 px-3 text-right">
														{#if editingDropdown === dropdown.id && !isAddingRole && editingRoleIndex === -1}
															<button
																class="text-blue-600 hover:text-blue-800 mr-2 text-sm"
																on:click={() => editRole(dropdown, index)}
															>
																編輯
															</button>
															<button
																class="text-red-600 hover:text-red-800 text-sm"
																on:click={() => deleteRole(dropdown, index)}
															>
																刪除
															</button>
														{/if}
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{:else}
								<p class="text-gray-500 italic text-sm">尚未添加任何身分組選項</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- 編輯或添加下拉選單表單 -->
	{#if isAdding || (editingDropdown && editingRoleIndex === -1 && !isAddingRole)}
		<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
			<h3 class="text-lg font-medium mb-4">
				{isAdding ? '新增身分組下拉選單' : '編輯身分組下拉選單'}
			</h3>

			{#if isAdding}
				<div class="mb-4">
					<label for="dropdownId" class="block text-sm font-medium text-gray-700 mb-1">
						選單 ID <span class="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="dropdownId"
						bind:value={newDropdownId}
						placeholder="請輸入選單 ID"
						class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
					/>
					<p class="text-xs text-gray-500 mt-1">選單的唯一識別碼</p>
				</div>
			{/if}

			<div class="mb-4">
				<label for="channelId" class="block text-sm font-medium text-gray-700 mb-1">
					頻道選擇 <span class="text-red-500">*</span>
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
				<p class="text-xs text-gray-500 mt-1">下拉選單將會出現在此頻道</p>
			</div>

			<div class="mb-4">
				<label for="listName" class="block text-sm font-medium text-gray-700 mb-1">
					列表名稱 <span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="listName"
					bind:value={newListName}
					placeholder="請輸入列表名稱"
					class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
				/>
				<p class="text-xs text-gray-500 mt-1">下拉選單顯示的名稱</p>
			</div>

			<div class="flex justify-end space-x-3 mt-6">
				<button
					class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					on:click={cancelEdit}
				>
					取消
				</button>
				<button
					class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
					on:click={saveDropdown}
					disabled={saving}
				>
					{saving ? '儲存中...' : '儲存'}
				</button>
			</div>
		</div>
	{/if}

	<!-- 編輯或添加身分組表單 -->
	{#if editingDropdown && (isAddingRole || editingRoleIndex !== -1)}
		<div class="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
			<h3 class="text-lg font-medium mb-4">{isAddingRole ? '新增身分組選項' : '編輯身分組選項'}</h3>

			<div class="mb-4">
				<label for="roleLabel" class="block text-sm font-medium text-gray-700 mb-1">
					標籤 <span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="roleLabel"
					bind:value={newRoleLabel}
					placeholder="請輸入標籤"
					class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
				/>
				<p class="text-xs text-gray-500 mt-1">下拉選單中顯示的選項名稱</p>
			</div>

			<div class="mb-4">
				<label for="roleValue" class="block text-sm font-medium text-gray-700 mb-1">
					身分組 ID <span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="roleValue"
					bind:value={newRoleValue}
					placeholder="請輸入身分組 ID"
					class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
				/>
				<p class="text-xs text-gray-500 mt-1">要賦予給用戶的 Discord 身分組 ID</p>
			</div>

			<div class="mb-4">
				<label for="roleEmoji" class="block text-sm font-medium text-gray-700 mb-1">
					表情符號
				</label>
				<input
					type="text"
					id="roleEmoji"
					bind:value={newRoleEmoji}
					placeholder="請輸入表情符號 (選填)"
					class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
				/>
				<p class="text-xs text-gray-500 mt-1">
					選項旁顯示的表情符號，例如 `:smile:` 或自訂表情符號 (例如 `:custom:1234567890`)
				</p>
			</div>

			<div class="flex justify-end space-x-3 mt-6">
				<button
					class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					on:click={() => {
						isAddingRole = false
						editingRoleIndex = -1
					}}
				>
					取消
				</button>
				<button
					class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
					on:click={saveRole}
					disabled={saving}
				>
					{saving ? '儲存中...' : '儲存'}
				</button>
			</div>
		</div>
	{/if}

	<div class="mt-8 border-t border-gray-200 pt-4">
		<h3 class="text-lg font-medium mb-2">關於身分組下拉選單</h3>
		<p class="text-gray-600">身分組下拉選單功能允許伺服器成員通過下拉選單選擇自己想要的身分組。</p>
	</div>
</div>
