<script>
	import LoadingOverlay from '$lib/components/LoadingOverlay.svelte'
	import { LightSwitch } from '@skeletonlabs/skeleton'
	import { page } from '$app/state'

	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	const { data, children } = $props()

	const user = $derived(data?.user)
	const isAuthenticated = $derived(user?.discord?.authenticated || false)
	const inGuild = $derived(/^\/panel\/guild\/\d+/.test(page.url.pathname))
</script>

<LoadingOverlay />

{#if isAuthenticated}
	<div class="panel-shell">
		<div class="panel-userbar">
			<div class="userbar-inner">
				<div class="userbar-left">
					{#if inGuild}
						<a href="/panel" class="userbar-back" aria-label="返回伺服器清單">
							<span class="userbar-back-arrow">←</span>
							<span>返回伺服器清單</span>
						</a>
						<span class="userbar-sep" aria-hidden="true">/</span>
					{/if}
					{#if user.discord.avatar}
						<img src={user.discord.avatar} alt="" class="userbar-avatar" />
					{:else}
						<div class="userbar-avatar userbar-avatar-fallback">
							{user.discord.username?.substring(0, 2).toUpperCase()}
						</div>
					{/if}
					<div class="userbar-meta">
						<div class="userbar-label">— signed_in_as_</div>
						<div class="userbar-name">{user.discord.username}</div>
					</div>
				</div>
				<div class="userbar-right">
					<span class="userbar-id">id: {user.discord.id}</span>
					<LightSwitch />
				</div>
			</div>
		</div>
		<div class="panel-body">
			{@render children()}
		</div>
	</div>
{:else}
	<div class="signin">
		<div class="signin-meta">— sign_in_</div>
		<div class="signin-content">
			<h1 class="signin-title">
				<span>access</span><br />
				<span class="signin-title-muted">required.</span>
			</h1>
			<p class="signin-sub">使用 Discord 帳號登入以管理你的伺服器</p>
			<a href="/api/auth" class="signin-link">
				<span>使用 Discord 登入</span>
				<span class="signin-arrow">→</span>
			</a>
		</div>
		<div class="signin-foot">scroll_</div>
	</div>
{/if}

<style>
	.panel-shell {
		--panel-header-h: 4.5rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #faf9f6;
		color: #1a1a1a;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
	}

	.panel-userbar {
		position: sticky;
		top: 0;
		z-index: 30;
		background: rgba(250, 249, 246, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid #e8e4da;
	}

	.userbar-inner {
		margin: 0 auto;
		padding: 1rem 2.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	.userbar-left {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-width: 0;
		flex-wrap: wrap;
	}

	.userbar-back {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: #1a1a1a;
		padding: 0.4rem 0.7rem;
		margin-left: -0.7rem;
		border-radius: 2px;
		transition:
			background 0.2s ease,
			gap 0.3s ease;
	}

	.userbar-back:hover {
		background: #f3f0e8;
		gap: 0.85rem;
	}

	.userbar-back-arrow {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.95rem;
	}

	.userbar-sep {
		color: #b5ad9d;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}

	:global(.dark) .userbar-back {
		color: #faf9f6;
	}

	:global(.dark) .userbar-back:hover {
		background: #232321;
	}

	.userbar-avatar {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 9999px;
		object-fit: cover;
		border: 1px solid #e8e4da;
	}

	.userbar-avatar-fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f3f0e8;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		color: #6b6557;
	}

	.userbar-meta {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.userbar-label {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.65rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.userbar-name {
		font-size: 0.95rem;
		font-weight: 400;
		color: #1a1a1a;
	}

	.userbar-id {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		color: #8a8478;
	}

	.userbar-right {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;
	}

	@media (max-width: 640px) {
		.userbar-id {
			display: none;
		}
	}

	.panel-body {
		flex: 1;
		overflow: auto;
	}

	.signin {
		min-height: 100vh;
		background: #faf9f6;
		color: #1a1a1a;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 3rem;
		padding: 5rem 2.5rem 3rem;
	}

	@media (min-width: 768px) {
		.signin {
			padding: 5rem 5rem 3rem;
		}
	}

	.signin-meta,
	.signin-foot {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.signin-foot {
		text-align: right;
		opacity: 0.6;
	}

	.signin-content {
		align-self: end;
		max-width: 1200px;
	}

	.signin-title {
		font-size: clamp(4rem, 12vw, 10rem);
		font-weight: 300;
		line-height: 0.95;
		letter-spacing: -0.04em;
		margin: 0;
	}

	.signin-title-muted {
		color: transparent;
		-webkit-text-stroke: 1px #1a1a1a;
		font-style: italic;
		font-weight: 200;
	}

	.signin-sub {
		margin-top: 1.5rem;
		margin-bottom: 2.5rem;
		font-size: 1rem;
		font-weight: 300;
		color: #6b6557;
		max-width: 28rem;
	}

	.signin-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.95rem;
		color: #1a1a1a;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid #1a1a1a;
		transition: gap 0.4s ease;
		position: relative;
	}

	.signin-link:hover {
		gap: 1.25rem;
	}

	.signin-link::before {
		content: '';
		position: absolute;
		left: 0;
		bottom: -1px;
		height: 2px;
		width: 100%;
		background: #5a6f4c;
		transform-origin: left;
		transform: scaleX(0.3);
		transition: transform 0.4s ease;
	}

	.signin-link:hover::before {
		transform: scaleX(1);
	}

	.signin-arrow {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.9rem;
	}

	:global(.dark) .panel-shell,
	:global(.dark) .signin {
		background: #1a1a1a;
		color: #faf9f6;
	}

	:global(.dark) .panel-userbar {
		background: rgba(26, 26, 26, 0.85);
		border-bottom-color: #2a2a28;
	}

	:global(.dark) .userbar-name,
	:global(.dark) .signin-title {
		color: #faf9f6;
	}

	:global(.dark) .userbar-label,
	:global(.dark) .userbar-id,
	:global(.dark) .signin-meta,
	:global(.dark) .signin-foot,
	:global(.dark) .signin-sub {
		color: #a8a293;
	}

	:global(.dark) .userbar-avatar {
		border-color: #2a2a28;
	}

	:global(.dark) .userbar-avatar-fallback {
		background: #232321;
		color: #a8a293;
	}

	:global(.dark) .signin-title-muted {
		-webkit-text-stroke-color: #faf9f6;
	}

	:global(.dark) .signin-link {
		color: #faf9f6;
		border-bottom-color: #faf9f6;
	}

	:global(.dark) .signin-link::before {
		background: #8fa67d;
	}
</style>
