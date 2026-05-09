<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton'
	import { base } from '$app/paths'
</script>

<header class="site-header">
	<div class="header-inner">
		<div class="header-left">
			<a href="{base}/" class="brand">
				<span class="brand-name">nothing_bot</span>
			</a>
			<nav class="nav">
				<a href="{base}/">Docs</a>
				<a href="{base}/panel">Panel</a>
				<a href="{base}/ptsworld">RPG</a>
			</nav>
		</div>
		<div class="header-right">
			<LightSwitch />
		</div>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 30;
		width: 100%;
		background: rgba(250, 249, 246, 0.75);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid #e8e4da;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
	}

	.header-inner {
		max-width: 1300px;
		margin: 0 auto;
		padding: 1rem 2.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 3rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: #1a1a1a;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.9rem;
		letter-spacing: 0.02em;
	}

	.nav {
		display: none;
		gap: 2rem;
		font-size: 0.85rem;
		font-weight: 300;
		color: #6b6557;
	}

	@media (min-width: 768px) {
		.nav {
			display: flex;
		}
	}

	.nav a {
		position: relative;
		padding-bottom: 2px;
		transition: color 0.3s ease;
	}

	.nav a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
		background: #1a1a1a;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.3s ease;
	}

	.nav a:hover {
		color: #1a1a1a;
	}

	.nav a:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	:global(.dark) .site-header {
		background: rgba(26, 26, 26, 0.75);
		border-bottom-color: #2a2a28;
	}

	:global(.dark) .brand,
	:global(.dark) .nav a:hover {
		color: #faf9f6;
	}

	:global(.dark) .nav {
		color: #a8a293;
	}

	:global(.dark) .nav a::after {
		background: #faf9f6;
	}
</style>
