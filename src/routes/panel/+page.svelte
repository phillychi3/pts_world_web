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

<div class="guilds">
	<div class="guilds-inner">
		<div class="guilds-head">
			<span class="guilds-meta">— guilds_</span>
			<h1 class="guilds-title">伺服器清單</h1>
			<p class="guilds-sub">選擇你想管理的 Discord 伺服器</p>
		</div>

		{#if data.error}
			<div class="guilds-error">
				<span class="error-tag">error_</span>
				<span>{data.error}</span>
			</div>
		{/if}

		{#if hasGuilds}
			<div class="guilds-grid">
				{#each discordGuilds as guild}
					{#if guild.isAdmin || guild.owner}
						<button class="guild-card" onclick={() => gotoguild(guild)}>
							<div class="guild-row">
								{#if guild.icon}
									<img src={guild.icon} alt="" class="guild-icon" />
								{:else}
									<div class="guild-icon guild-icon-fallback">
										{guild.name.substring(0, 2).toUpperCase()}
									</div>
								{/if}
								<h3 class="guild-name">{guild.name}</h3>
							</div>
							<div class="guild-tags">
								{#if guild.owner}
									<span class="tag tag-owner">owner_</span>
								{/if}
								{#if guild.isAdmin}
									<span class="tag tag-admin">admin_</span>
								{/if}
							</div>
							<div class="guild-action">
								<span>查看詳情</span>
								<span class="guild-arrow">→</span>
							</div>
						</button>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="guilds-empty">
				<div class="empty-meta">— empty_</div>
				<p class="empty-text">尚未加入任何 Discord 伺服器，或尚未授權存取伺服器資訊。</p>
				{#if !data.user?.discord?.authenticated}
					<a href="/api/auth/discord" class="empty-link">
						<span>使用 Discord 登入</span>
						<span class="guild-arrow">→</span>
					</a>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.guilds {
		min-height: 100vh;
		background: #faf9f6;
		color: #1a1a1a;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
		padding: 5rem 2.5rem 8rem;
	}

	.guilds-inner {
		max-width: 1300px;
		margin: 0 auto;
	}

	.guilds-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 4rem;
	}

	.guilds-meta {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.guilds-title {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 300;
		letter-spacing: -0.03em;
		line-height: 1;
		margin: 0;
	}

	.guilds-sub {
		font-size: 0.95rem;
		font-weight: 300;
		color: #6b6557;
		margin: 0;
	}

	.guilds-error {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border: 1px solid #d9b8a8;
		background: #f9efe8;
		color: #7a3a1f;
		font-size: 0.85rem;
		margin-bottom: 3rem;
		max-width: 36rem;
	}

	.error-tag {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #b55a2f;
	}

	.guilds-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		border-top: 1px solid #e8e4da;
		border-left: 1px solid #e8e4da;
	}

	.guild-card {
		all: unset;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 2rem;
		border-right: 1px solid #e8e4da;
		border-bottom: 1px solid #e8e4da;
		text-align: left;
		transition: background 0.4s ease;
	}

	.guild-card:hover {
		background: #f3f0e8;
	}

	.guild-card:hover .guild-arrow {
		transform: translateX(4px);
	}

	.guild-row {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.guild-icon {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		object-fit: cover;
		border: 1px solid #e8e4da;
		flex-shrink: 0;
	}

	.guild-icon-fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f3f0e8;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		color: #6b6557;
	}

	.guild-name {
		font-size: 1.05rem;
		font-weight: 400;
		letter-spacing: -0.01em;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
	}

	.guild-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		padding: 0.25rem 0.6rem;
		border: 1px solid #e8e4da;
		color: #6b6557;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.tag::before {
		content: '';
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 9999px;
		background: currentColor;
	}

	.tag-owner {
		color: #a8783a;
		background: #f7eddc;
		border-color: #e8d4ae;
	}

	.tag-admin {
		color: #5a6f4c;
		background: #eef0e6;
		border-color: #c9d3ba;
	}

	.guild-action {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.85rem;
		color: #1a1a1a;
		margin-top: auto;
		padding-top: 0.75rem;
		border-top: 1px solid #e8e4da;
	}

	.guild-arrow {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		transition: transform 0.3s ease;
	}

	.guilds-empty {
		max-width: 32rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 3rem 0;
		border-top: 1px solid #e8e4da;
		border-bottom: 1px solid #e8e4da;
	}

	.empty-meta {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.empty-text {
		font-size: 0.95rem;
		font-weight: 300;
		color: #6b6557;
		line-height: 1.7;
		margin: 0;
	}

	.empty-link {
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

	.empty-link:hover {
		gap: 1rem;
	}

	:global(.dark) .guilds {
		background: #1a1a1a;
		color: #faf9f6;
	}

	:global(.dark) .guilds-meta,
	:global(.dark) .guilds-sub,
	:global(.dark) .empty-text,
	:global(.dark) .empty-meta {
		color: #a8a293;
	}

	:global(.dark) .guilds-grid,
	:global(.dark) .guild-card,
	:global(.dark) .guild-icon,
	:global(.dark) .guild-action,
	:global(.dark) .tag,
	:global(.dark) .guilds-empty {
		border-color: #2a2a28;
	}

	:global(.dark) .guild-card:hover {
		background: #232321;
	}

	:global(.dark) .guild-icon-fallback {
		background: #232321;
		color: #a8a293;
	}

	:global(.dark) .guild-name,
	:global(.dark) .guild-action,
	:global(.dark) .empty-link {
		color: #faf9f6;
	}

	:global(.dark) .empty-link {
		border-bottom-color: #faf9f6;
	}

	:global(.dark) .tag {
		color: #a8a293;
		background: transparent;
	}

	:global(.dark) .tag-owner {
		color: #d4a86a;
		background: #2e2419;
		border-color: #5a4528;
	}

	:global(.dark) .tag-admin {
		color: #9bb085;
		background: #1f2419;
		border-color: #3a4a32;
	}

	:global(.dark) .guilds-error {
		background: #2a1f1a;
		border-color: #4a3024;
		color: #d9b8a8;
	}
</style>
