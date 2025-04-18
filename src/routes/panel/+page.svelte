<script>
	import { goto } from '$app/navigation'
	const { data } = $props()

	const discordGuilds = $derived(data.discordGuilds || [])
	const hasGuilds = $derived(discordGuilds.length > 0)

	function gotoguild(guild) {
		goto(`/panel/guild/${guild.id}`)
	}
</script>

<div class="container">
	<h1>Discord 伺服器清單</h1>

	{#if data.error}
		<div class="error-message">
			<p>{data.error}</p>
		</div>
	{/if}

	{#if hasGuilds}
		<div class="guilds-grid">
			{#each discordGuilds as guild}
				{#if guild.isAdmin || guild.owner}
					<div class="guild-card">
						<div class="guild-header">
							{#if guild.icon}
								<img src={guild.icon} alt="{guild.name} icon" class="guild-icon" />
							{:else}
								<div class="guild-icon-placeholder">
									{guild.name.substring(0, 2)}
								</div>
							{/if}
							<h3 class="guild-name">{guild.name}</h3>
						</div>
						<div class="guild-meta">
							{#if guild.owner}
								<span class="badge owner-badge">伺服器擁有者</span>
							{/if}
							{#if guild.isAdmin}
								<span class="badge admin-badge">管理員</span>
							{/if}
						</div>
						<div class="guild-actions">
							<button class="view-button" onclick={() => gotoguild(guild)}>查看詳情</button>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{:else}
		<div class="no-guilds">
			<p>尚未加入任何 Discord 伺服器，或尚未授權存取伺服器資訊。</p>
			{#if !data.user?.discord?.authenticated}
				<a href="/api/auth/discord" class="login-button">使用 Discord 登入</a>
			{/if}
		</div>
	{/if}
</div>

<style>
	.container {
		padding: 1rem;
	}

	h1 {
		margin-bottom: 1.5rem;
		font-size: 1.8rem;
	}

	.guilds-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	.guild-card {
		background-color: #f5f5f5;
		border-radius: 8px;
		padding: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.guild-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	.guild-header {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.guild-icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 0.75rem;
		object-fit: cover;
	}

	.guild-icon-placeholder {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 0.75rem;
		background-color: #5865f2;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}

	.guild-name {
		font-size: 1rem;
		margin: 0;
		font-weight: 600;
	}

	.guild-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.badge {
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.owner-badge {
		background-color: #ffd700;
		color: #333;
	}

	.admin-badge {
		background-color: #5865f2;
		color: white;
	}

	.guild-actions {
		display: flex;
		justify-content: flex-end;
	}

	.view-button {
		background-color: #5865f2;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.view-button:hover {
		background-color: #4752c4;
	}

	.no-guilds {
		text-align: center;
		padding: 2rem;
		background-color: #f5f5f5;
		border-radius: 8px;
	}

	.login-button {
		display: inline-block;
		margin-top: 1rem;
		background-color: #5865f2;
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-weight: 500;
	}

	.error-message {
		background-color: #ffebee;
		color: #c62828;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}
</style>
