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

	if (!data.error) loadChannels()
</script>

<div class="overview">
	<header class="ov-head">
		<span class="ov-meta">— overview_</span>
		<h1 class="ov-title">伺服器狀態概覽</h1>
		<p class="ov-sub">查看當前伺服器所有功能的啟用狀態</p>
	</header>

	{#if data.error}
		{#if data.error === 'Guild not found'}
			<div class="ov-error">
				<span class="error-tag">error_</span>
				<p class="ov-error-text">機器人尚未加入伺服器</p>
				<a
					href="https://discord.com/oauth2/authorize?client_id=1044529058689593435&permissions=1641549393014&scope=bot%20applications.commands"
					target="_blank"
					class="ov-link"
				>
					<span>邀請機器人</span>
					<span class="ov-arrow">→</span>
				</a>
			</div>
		{:else}
			<div class="ov-error">
				<span class="error-tag">error_</span>
				<p class="ov-error-text">{data.error}</p>
			</div>
		{/if}
	{:else}
		<!-- 基本設定 -->
		<section class="ov-section">
			<h2 class="ov-section-title">— basic_</h2>
			<div class="ov-grid">
				<div class="ov-card">
					<h3 class="ov-card-title">伺服器狀態</h3>
					<div class="ov-status-grid">
						<div class="ov-status">
							<span class="dot" class:dot-on={guild.ispro}></span>
							<span>專業版</span>
						</div>
						<div class="ov-status">
							<span class="dot" class:dot-on={guild.User_Activity}></span>
							<span>用戶活動記錄</span>
						</div>
					</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">連結修正功能</h3>
					<div class="ov-status-grid">
						<div class="ov-status">
							<span class="dot" class:dot-on={guild.isfixtwitter}></span>
							<span>Twitter 連結</span>
						</div>
						<div class="ov-status">
							<span class="dot" class:dot-on={guild.isfixnhentai}></span>
							<span>nhentai 連結</span>
						</div>
						<div class="ov-status">
							<span class="dot" class:dot-on={guild.isfixpixiv}></span>
							<span>Pixiv 連結</span>
						</div>
						<div class="ov-status">
							<span class="dot" class:dot-on={guild.isfixex}></span>
							<span>E(x)hentai 連結</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- 安全設定 -->
		<section class="ov-section">
			<h2 class="ov-section-title">— security_</h2>
			<div class="ov-grid">
				<div class="ov-card">
					<h3 class="ov-card-title">蜜罐</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.xaoc2.honeypot.enabled}></span>
						<span>是否啟用</span>
					</div>
					<div class="ov-muted ov-muted-spaced">
						頻道 ID: {formatChannelId(guild.xaoc2.honeypot.channel_id) || '未設定'}
					</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">隔離區</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.xaoc2.quarantine.enabled}></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">user install spam</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.xaoc2.userinstallspam.enabled}></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">4fish</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.xaoc2['4fish'].enabled}></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">垃圾訊息檢測</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.xaoc2.spam_detection.enabled}></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">釣魚檢測</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.anti_fish}></span>
						<span>是否啟用</span>
					</div>
				</div>
			</div>
		</section>

		<!-- 紀錄設定 -->
		<section class="ov-section">
			<h2 class="ov-section-title">— logging_</h2>
			<div class="ov-card ov-card-wide">
				<h3 class="ov-card-title">紀錄頻道</h3>
				<p class="ov-pill">
					{getChannelName(formatChannelId(guild.log_config.channel_id))}
					<span class="ov-mono">{formatChannelId(guild.log_config.channel_id) || '未設定'}</span>
				</p>

				<div class="ov-row-grid">
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.member_join_leave}></span>
						<span>會員加入/離開</span>
					</div>
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.message_delete}></span>
						<span>訊息刪除</span>
					</div>
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.message_edit}></span>
						<span>訊息編輯</span>
					</div>
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.voice_join_leave}></span>
						<span>語音頻道加入/離開</span>
					</div>
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.voice_stream}></span>
						<span>語音直播紀錄</span>
					</div>
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.voice_event}></span>
						<span>語音事件</span>
					</div>
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.role_update}></span>
						<span>身分組更新</span>
					</div>
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.channel_update}></span>
						<span>頻道更新</span>
					</div>
					<div class="ov-row">
						<span class="dot" class:dot-on={guild.log_config.guild_update}></span>
						<span>伺服器更新</span>
					</div>
				</div>
			</div>
		</section>

		<!-- 訊息設定 -->
		<section class="ov-section">
			<h2 class="ov-section-title">— messages_</h2>
			<div class="ov-grid">
				<div class="ov-card">
					<h3 class="ov-card-title">歡迎訊息</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.welcome.channel}></span>
						<span>是否啟用</span>
					</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">離開訊息</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.leave.channel}></span>
						<span>是否啟用</span>
					</div>
				</div>
			</div>
		</section>

		<!-- 動漫通知 -->
		<section class="ov-section">
			<h2 class="ov-section-title">— anime_</h2>
			<div class="ov-card ov-card-wide">
				<div class="ov-status">
					<span class="dot" class:dot-on={guild.anime.is_enabled}></span>
					<span>{guild.anime.is_enabled ? '已啟用' : '未啟用'}</span>
				</div>
				<div class="ov-grid ov-grid-tight">
					<div class="ov-muted">頻道: {getChannelName(formatChannelId(guild.anime.channel))}</div>
					<div class="ov-muted">Webhook: {guild.anime.webhook ? '已設定' : '未設定'}</div>
				</div>
			</div>
		</section>

		<!-- 身分組下拉選單 -->
		<section class="ov-section">
			<h2 class="ov-section-title">— role_dropdown_</h2>
			{#if Object.keys(guild.role_dropdown || {}).length > 0}
				<div class="ov-stack">
					{#each Object.entries(guild.role_dropdown) as [key, dropdown]}
						<div class="ov-card ov-card-wide">
							<h3 class="ov-card-title">{dropdown.listname}</h3>
							<div class="ov-muted">頻道 ID: {formatChannelId(dropdown.channel_id)}</div>
							<div class="ov-mini-label">身分組列表 ({dropdown.roles.length})</div>
							<div class="ov-roles">
								{#each dropdown.roles as role}
									<div class="ov-role">
										<span class="ov-role-mark">{role.emoji || '·'}</span>
										<span>{role.label}</span>
										<span class="ov-mono ov-muted">{role.value}</span>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="ov-muted ov-italic">尚未設定身分組下拉選單</p>
			{/if}
		</section>

		<!-- 其他設定 -->
		<section class="ov-section">
			<h2 class="ov-section-title">— misc_</h2>
			<div class="ov-grid">
				<div class="ov-card">
					<h3 class="ov-card-title">TTS 語音功能</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.tts?.is_enabled}></span>
						<span>{guild.tts?.is_enabled ? '已啟用' : '未啟用'}</span>
					</div>
					<div class="ov-muted">頻道 ID: {guild.tts?.channel || '未設定'}</div>
					<div class="ov-muted">已授權用戶: {guild.tts?.users?.length || 0} 位</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">Daily Wife 功能</h3>
					<div class="ov-muted">
						已登記的 wife 數量: {Object.keys(guild.Daily_wife || {}).length}
					</div>
					<div class="ov-muted">禁用用戶數量: {guild.Disable_wife_users?.length || 0}</div>
				</div>
				<div class="ov-card">
					<h3 class="ov-card-title">R18</h3>
					<div class="ov-status">
						<span class="dot" class:dot-on={guild.r18on}></span>
						<span>R18 {guild.r18on ? '已啟用' : '未啟用'}</span>
					</div>
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	.overview {
		font-family: 'Noto Sans TC', system-ui, sans-serif;
		color: #1a1a1a;
		max-width: 1200px;
	}

	.ov-head {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin-bottom: 3.5rem;
	}

	.ov-meta {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.ov-title {
		font-size: clamp(2rem, 4.5vw, 3rem);
		font-weight: 300;
		letter-spacing: -0.03em;
		line-height: 1;
		margin: 0;
	}

	.ov-sub {
		font-size: 0.9rem;
		font-weight: 300;
		color: #6b6557;
		margin: 0;
	}

	.ov-section {
		margin-bottom: 3rem;
	}

	.ov-section-title {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
		font-weight: 400;
		padding-bottom: 0.85rem;
		border-bottom: 1px solid #e8e4da;
		margin: 0 0 1.5rem;
	}

	.ov-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
	}

	.ov-grid-tight {
		gap: 0.5rem;
		margin-top: 0.85rem;
	}

	.ov-card {
		padding: 1.5rem;
		background: #faf9f6;
		border: 1px solid #e8e4da;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.ov-card-wide {
		grid-column: 1 / -1;
	}

	.ov-card-title {
		font-size: 0.95rem;
		font-weight: 400;
		letter-spacing: -0.01em;
		margin: 0;
	}

	.ov-status-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 0.5rem 1rem;
	}

	.ov-status {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.85rem;
		font-weight: 350;
	}

	.dot {
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 9999px;
		background: #d8d3c5;
		display: inline-block;
		flex-shrink: 0;
		transition:
			background 0.3s ease,
			box-shadow 0.3s ease;
	}

	.dot-on {
		background: #22e07a;
		box-shadow:
			0 0 4px rgba(34, 224, 122, 0.9),
			0 0 10px rgba(34, 224, 122, 0.55),
			0 0 0 3px rgba(34, 224, 122, 0.18);
		animation: led-blink 1.6s ease-in-out infinite;
	}

	@keyframes led-blink {
		0%,
		100% {
			background: #22e07a;
			box-shadow:
				0 0 4px rgba(34, 224, 122, 0.9),
				0 0 10px rgba(34, 224, 122, 0.55),
				0 0 0 3px rgba(34, 224, 122, 0.18);
		}
		50% {
			background: #1a9c54;
			box-shadow:
				0 0 1px rgba(34, 224, 122, 0.4),
				0 0 3px rgba(34, 224, 122, 0.15),
				0 0 0 3px rgba(34, 224, 122, 0.06);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dot-on {
			animation: none;
		}
	}

	.ov-muted {
		font-size: 0.8rem;
		font-weight: 350;
		color: #6b6557;
		line-height: 1.6;
	}

	.ov-muted-spaced {
		margin-top: 0.25rem;
	}

	.ov-italic {
		font-style: italic;
	}

	.ov-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.85rem;
		padding: 0.5rem 0.85rem;
		background: #f3f0e8;
		border: 1px solid #e8e4da;
		font-weight: 300;
		flex-wrap: wrap;
	}

	.ov-mono {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		color: #8a8478;
	}

	.ov-row-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.ov-row {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.6rem 0.85rem;
		border: 1px solid #e8e4da;
		font-size: 0.8rem;
		font-weight: 350;
	}

	.ov-stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.ov-mini-label {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		color: #8a8478;
		text-transform: uppercase;
		margin-top: 0.5rem;
	}

	.ov-roles {
		max-height: 12rem;
		overflow-y: auto;
		border: 1px solid #e8e4da;
		display: flex;
		flex-direction: column;
	}

	.ov-role {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.85rem;
		padding: 0.6rem 0.85rem;
		border-bottom: 1px solid #e8e4da;
		font-size: 0.85rem;
		font-weight: 300;
	}

	.ov-role:last-child {
		border-bottom: none;
	}

	.ov-role-mark {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		color: #5a6f4c;
		font-size: 0.85rem;
	}

	.ov-error {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.5rem;
		border: 1px solid #d9b8a8;
		background: #f9efe8;
		color: #7a3a1f;
		max-width: 36rem;
		margin-bottom: 2rem;
	}

	.error-tag {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #b55a2f;
	}

	.ov-error-text {
		font-size: 0.9rem;
		margin: 0;
	}

	.ov-link {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.9rem;
		color: #1a1a1a;
		padding-bottom: 0.3rem;
		border-bottom: 1px solid #1a1a1a;
		width: fit-content;
		transition: gap 0.3s ease;
	}

	.ov-link:hover {
		gap: 1rem;
	}

	.ov-arrow {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}

	:global(.dark) .overview {
		color: #faf9f6;
	}

	:global(.dark) .ov-meta,
	:global(.dark) .ov-sub,
	:global(.dark) .ov-section-title,
	:global(.dark) .ov-muted,
	:global(.dark) .ov-mini-label,
	:global(.dark) .ov-mono {
		color: #a8a293;
	}

	:global(.dark) .ov-section-title {
		border-bottom-color: #2a2a28;
	}

	:global(.dark) .ov-card,
	:global(.dark) .ov-row,
	:global(.dark) .ov-roles,
	:global(.dark) .ov-role,
	:global(.dark) .ov-pill {
		background: #1a1a1a;
		border-color: #2a2a28;
	}

	:global(.dark) .ov-pill {
		background: #232321;
	}

	:global(.dark) .dot {
		background: #3a3833;
	}

	:global(.dark) .dot-on {
		background: #2dff88;
		box-shadow:
			0 0 5px rgba(45, 255, 136, 1),
			0 0 12px rgba(45, 255, 136, 0.7),
			0 0 0 3px rgba(45, 255, 136, 0.2);
	}

	:global(.dark) .dot-on {
		animation-name: led-blink-dark;
	}

	@keyframes led-blink-dark {
		0%,
		100% {
			background: #2dff88;
			box-shadow:
				0 0 5px rgba(45, 255, 136, 1),
				0 0 12px rgba(45, 255, 136, 0.7),
				0 0 0 3px rgba(45, 255, 136, 0.2);
		}
		50% {
			background: #1aa658;
			box-shadow:
				0 0 1px rgba(45, 255, 136, 0.5),
				0 0 4px rgba(45, 255, 136, 0.2),
				0 0 0 3px rgba(45, 255, 136, 0.08);
		}
	}

	:global(.dark) .ov-role-mark {
		color: #8fa67d;
	}

	:global(.dark) .ov-error {
		background: #2a1f1a;
		border-color: #4a3024;
		color: #d9b8a8;
	}

	:global(.dark) .ov-link {
		color: #faf9f6;
		border-bottom-color: #faf9f6;
	}
</style>
