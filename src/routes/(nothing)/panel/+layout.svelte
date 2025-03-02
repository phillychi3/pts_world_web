<script>
	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	export let data

	$: user = data?.user
	$: isAuthenticated = user?.discord?.authenticated || false
</script>

<div>
	{#if isAuthenticated}
		<div class="user-profile">
			{#if user.discord.avatar}
				<img src={user.discord.avatar} alt="Discord Avatar" class="avatar" />
			{/if}
			<div class="user-info">
				<h3>歡迎, {user.discord.username}</h3>
				<p>Discord ID: {user.discord.id}</p>
				{#if user.discord.email}
					<p>Email: {user.discord.email}</p>
				{/if}
			</div>
		</div>
	{:else}
		<div class="login-prompt">
			<p>您尚未登入 Discord</p>
			<a href="/api/auth" class="login-btn">使用 Discord 登入</a>
		</div>
	{/if}

	<slot></slot>
</div>

<style>
	.user-profile {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		padding: 0.5rem;
		border-radius: 4px;
		background-color: #f5f5f5;
	}

	.avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		margin-right: 1rem;
	}

	.login-btn {
		display: inline-block;
		padding: 0.5rem 1rem;
		background-color: #5865f2;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		font-weight: 500;
	}

	.login-btn:hover {
		background-color: #4752c4;
	}
</style>
