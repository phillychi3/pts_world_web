<script>
	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props()
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { endNavigation, startNavigation } from '$lib/stores/navigation'

	let isLoading = $state(true)

	const guild = $derived(data?.guild)
	const re = new RegExp('^/panel/guild/\\d+/(.+)$')
	const match = re.exec(page.url.pathname)
	const path = match ? match[1] : ''
	const items = [
		{ key: '', code: '01', label: '基本設定' },
		{ key: 'welcome', code: '02', label: '歡迎訊息' },
		{ key: 'roles', code: '03', label: '身分組' },
		{ key: 'lockvoice', code: '04', label: '鎖碼語音頻道' },
		{ key: 'autovoice', code: '05', label: '自動語音頻道' },
		{ key: 'features', code: '06', label: '其他功能' }
	]

	let currentPath = $state(path)
	/**
	 * @param {string} path
	 */
	async function go(path) {
		let guildId
		if (guild?.guild_id) {
			const highPart = BigInt(guild.guild_id.high) * BigInt(4294967296)
			const lowPart = BigInt(guild.guild_id.low >>> 0)
			guildId = String(highPart + lowPart)
		} else {
			guildId = page.params.id
		}

		startNavigation()

		const newPath = `/panel/guild/${guildId}/${path}`
		if (newPath !== page.url.pathname) {
			await goto(newPath)
			currentPath = path
		}
	}

	onMount(() => {
		setTimeout(() => {
			isLoading = false

			endNavigation()
		}, 100)
	})

	$effect(() => {
		if (page.params.id) {
			isLoading = true
			setTimeout(() => {
				isLoading = false

				endNavigation()
			}, 100)
		}
	})
</script>

<div class="guild-shell">
	{#if !data?.error}
		<aside class="guild-sidebar">
			<div class="sidebar-inner">
				<div class="sidebar-section">
					<div class="section-label">— sections_</div>
					<nav class="sidebar-nav">
						{#each items as item}
							<button
								type="button"
								class="nav-item"
								class:nav-item-active={currentPath === item.key}
								onclick={() => go(item.key)}
								onkeydown={(e) => e.key === 'Enter' && go(item.key)}
							>
								<span class="nav-code">{item.code}</span>
								<span class="nav-label">{item.label}</span>
								<span class="nav-arrow" aria-hidden="true">→</span>
							</button>
						{/each}
					</nav>
				</div>

				<div class="sidebar-foot">
					<div class="section-label">— guild_id_</div>
					<div class="guild-id-text">
						{#if guild?.guild_id}
							{(() => {
								const highPart = BigInt(guild.guild_id.high) * BigInt(4294967296)
								const lowPart = BigInt(guild.guild_id.low >>> 0)
								return String(highPart + lowPart)
							})()}
						{:else}
							-
						{/if}
					</div>
				</div>
			</div>
		</aside>

		<main class="guild-main">
			{@render children()}
		</main>
	{:else}
		<main class="guild-main guild-main-full">
			{@render children()}
		</main>
	{/if}
</div>

<style>
	.guild-shell {
		display: flex;
		min-height: 100vh;
		background: #faf9f6;
		color: #1a1a1a;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
	}

	.guild-sidebar {
		width: 18rem;
		flex-shrink: 0;
		position: fixed;
		left: 0;
		top: var(--panel-header-h, 4.5rem);
		height: calc(100vh - var(--panel-header-h, 4.5rem));
		background: #faf9f6;
		border-right: 1px solid #e8e4da;
		z-index: 20;
	}

	.sidebar-inner {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 1.75rem 1.25rem;
		gap: 2rem;
	}

	.sidebar-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 0;
	}

	.section-label {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.65rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
		padding: 0 0.5rem;
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		overflow-y: auto;
	}

	.nav-item {
		all: unset;
		cursor: pointer;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.85rem;
		padding: 0.75rem 0.75rem;
		font-size: 0.9rem;
		font-weight: 350;
		color: #1a1a1a;
		border-left: 2px solid transparent;
		transition:
			background 0.25s ease,
			border-color 0.25s ease,
			color 0.25s ease;
	}

	.nav-item:hover {
		background: #f3f0e8;
	}

	.nav-item:hover .nav-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	.nav-item-active {
		background: #f3f0e8;
		border-left-color: #5a6f4c;
		color: #1a1a1a;
		font-weight: 400;
	}

	.nav-item-active .nav-arrow {
		opacity: 1;
		transform: translateX(0);
		color: #5a6f4c;
	}

	.nav-code {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		color: #8a8478;
		letter-spacing: 0.1em;
	}

	.nav-item-active .nav-code {
		color: #5a6f4c;
	}

	.nav-label {
		text-align: left;
	}

	.nav-arrow {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.85rem;
		color: #8a8478;
		opacity: 0;
		transform: translateX(-4px);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}

	.sidebar-foot {
		padding-top: 1rem;
		border-top: 1px solid #e8e4da;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.guild-id-text {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		color: #6b6557;
		padding: 0 0.5rem;
		word-break: break-all;
	}

	.guild-main {
		margin-left: 18rem;
		flex: 1;
		min-width: 0;
		padding: 3rem 3rem 5rem;
	}

	.guild-main-full {
		margin-left: 0;
	}

	@media (max-width: 1024px) {
		.guild-shell {
			flex-direction: column;
		}
		.guild-sidebar {
			position: static;
			width: 100%;
			height: auto;
			border-right: none;
			border-bottom: 1px solid #e8e4da;
		}
		.sidebar-inner {
			padding: 1.25rem;
		}
		.sidebar-nav {
			max-height: none;
		}
		.guild-main {
			margin-left: 0;
			padding: 2rem 1.5rem 4rem;
		}
	}

	:global(.dark) .guild-shell,
	:global(.dark) .guild-sidebar {
		background: #1a1a1a;
		color: #faf9f6;
	}

	:global(.dark) .guild-sidebar,
	:global(.dark) .sidebar-foot {
		border-color: #2a2a28;
	}

	:global(.dark) .nav-item,
	:global(.dark) .guild-id-text {
		color: #faf9f6;
	}

	:global(.dark) .nav-item:hover,
	:global(.dark) .nav-item-active {
		background: #232321;
	}

	:global(.dark) .nav-item-active {
		border-left-color: #8fa67d;
	}

	:global(.dark) .nav-item-active .nav-arrow,
	:global(.dark) .nav-item-active .nav-code {
		color: #8fa67d;
	}

	:global(.dark) .section-label,
	:global(.dark) .nav-code,
	:global(.dark) .nav-arrow,
	:global(.dark) .guild-id-text {
		color: #a8a293;
	}

	/* ----- Global form skin scoped to .guild-main ----- */

	/* outer card containers (bg-white rounded-xl shadow / bg-white rounded-lg shadow-md) */
	:global(.guild-main .bg-white.rounded-xl),
	:global(.guild-main .bg-white.rounded-lg) {
		background: #faf9f6 !important;
		border: 1px solid #e8e4da !important;
		border-radius: 0 !important;
		box-shadow: none !important;
	}

	:global(.dark .guild-main .bg-white.rounded-xl),
	:global(.dark .guild-main .bg-white.rounded-lg),
	:global(.dark .guild-main .dark\:bg-gray-900) {
		background: #1a1a1a !important;
	}

	:global(.dark .guild-main .bg-white.rounded-xl),
	:global(.dark .guild-main .bg-white.rounded-lg) {
		border-color: #2a2a28 !important;
	}

	/* inner muted panels (bg-gray-50, bg-gray-100) */
	:global(.guild-main .bg-gray-50),
	:global(.guild-main .bg-gray-100) {
		background: #f3f0e8 !important;
	}

	:global(.dark .guild-main .bg-gray-50),
	:global(.dark .guild-main .bg-gray-100),
	:global(.dark .guild-main .dark\:bg-gray-800),
	:global(.dark .guild-main .dark\:bg-gray-700) {
		background: #232321 !important;
	}

	/* headings */
	:global(.guild-main h1) {
		font-size: clamp(2rem, 4.5vw, 3rem) !important;
		font-weight: 300 !important;
		letter-spacing: -0.03em !important;
		line-height: 1 !important;
		color: #1a1a1a !important;
	}

	:global(.dark .guild-main h1) {
		color: #faf9f6 !important;
	}

	:global(.guild-main h2) {
		font-size: 1.25rem !important;
		font-weight: 400 !important;
		letter-spacing: -0.01em !important;
		color: #1a1a1a !important;
	}

	:global(.dark .guild-main h2) {
		color: #faf9f6 !important;
	}

	:global(.guild-main h3) {
		font-weight: 400 !important;
		color: #1a1a1a !important;
	}

	:global(.dark .guild-main h3) {
		color: #faf9f6 !important;
	}

	/* form inputs / select / textarea */
	:global(.guild-main input[type='text']),
	:global(.guild-main input[type='number']),
	:global(.guild-main input[type='password']),
	:global(.guild-main input[type='email']),
	:global(.guild-main input:not([type])),
	:global(.guild-main select),
	:global(.guild-main textarea) {
		background: #faf9f6 !important;
		border: 1px solid #e8e4da !important;
		border-radius: 2px !important;
		color: #1a1a1a !important;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease !important;
	}

	:global(.guild-main input:focus),
	:global(.guild-main select:focus),
	:global(.guild-main textarea:focus) {
		outline: none !important;
		border-color: #5a6f4c !important;
		box-shadow: 0 0 0 3px rgba(90, 111, 76, 0.15) !important;
	}

	:global(.dark .guild-main input[type='text']),
	:global(.dark .guild-main input[type='number']),
	:global(.dark .guild-main input[type='password']),
	:global(.dark .guild-main input[type='email']),
	:global(.dark .guild-main input:not([type])),
	:global(.dark .guild-main select),
	:global(.dark .guild-main textarea) {
		background: #232321 !important;
		border-color: #2a2a28 !important;
		color: #faf9f6 !important;
	}

	:global(.dark .guild-main input:focus),
	:global(.dark .guild-main select:focus),
	:global(.dark .guild-main textarea:focus) {
		border-color: #8fa67d !important;
		box-shadow: 0 0 0 3px rgba(143, 166, 125, 0.2) !important;
	}

	/* checkboxes */
	:global(.guild-main input[type='checkbox']) {
		accent-color: #5a6f4c !important;
		border-radius: 2px !important;
	}

	:global(.dark .guild-main input[type='checkbox']) {
		accent-color: #8fa67d !important;
	}

	/* buttons — primary (black / blue / save) */
	:global(.guild-main button.bg-black),
	:global(.guild-main button.bg-blue-600),
	:global(.guild-main button.bg-blue-500),
	:global(.guild-main button.bg-blue-700),
	:global(.guild-main button.bg-indigo-600) {
		background: #1a1a1a !important;
		color: #faf9f6 !important;
		border-radius: 2px !important;
		border: 1px solid #1a1a1a !important;
		box-shadow: none !important;
		font-weight: 400 !important;
		transition:
			background 0.2s ease,
			color 0.2s ease !important;
	}

	:global(.guild-main button.bg-black:hover:not(:disabled)),
	:global(.guild-main button.bg-blue-600:hover:not(:disabled)),
	:global(.guild-main button.bg-blue-500:hover:not(:disabled)),
	:global(.guild-main button.bg-blue-700:hover:not(:disabled)),
	:global(.guild-main button.bg-indigo-600:hover:not(:disabled)) {
		background: #5a6f4c !important;
		border-color: #5a6f4c !important;
	}

	:global(.dark .guild-main button.bg-black),
	:global(.dark .guild-main button.bg-blue-600),
	:global(.dark .guild-main button.bg-blue-500),
	:global(.dark .guild-main button.bg-blue-700),
	:global(.dark .guild-main button.bg-indigo-600),
	:global(.dark .guild-main button.dark\:bg-white) {
		background: #faf9f6 !important;
		color: #1a1a1a !important;
		border-color: #faf9f6 !important;
	}

	:global(.dark .guild-main button.bg-black:hover:not(:disabled)),
	:global(.dark .guild-main button.bg-blue-600:hover:not(:disabled)),
	:global(.dark .guild-main button.bg-blue-500:hover:not(:disabled)),
	:global(.dark .guild-main button.bg-blue-700:hover:not(:disabled)),
	:global(.dark .guild-main button.bg-indigo-600:hover:not(:disabled)) {
		background: #8fa67d !important;
		color: #1a1a1a !important;
		border-color: #8fa67d !important;
	}

	/* buttons — danger (red) */
	:global(.guild-main button.bg-red-600),
	:global(.guild-main button.bg-red-700),
	:global(.guild-main button.bg-red-500) {
		background: transparent !important;
		color: #b55a2f !important;
		border: 1px solid #d9b8a8 !important;
		border-radius: 2px !important;
		box-shadow: none !important;
		transition:
			background 0.2s ease,
			color 0.2s ease !important;
	}

	:global(.guild-main button.bg-red-600:hover:not(:disabled)),
	:global(.guild-main button.bg-red-700:hover:not(:disabled)),
	:global(.guild-main button.bg-red-500:hover:not(:disabled)) {
		background: #f9efe8 !important;
		color: #7a3a1f !important;
	}

	:global(.dark .guild-main button.bg-red-600),
	:global(.dark .guild-main button.bg-red-700),
	:global(.dark .guild-main button.bg-red-500) {
		color: #d9b8a8 !important;
		border-color: #4a3024 !important;
	}

	:global(.dark .guild-main button.bg-red-600:hover:not(:disabled)),
	:global(.dark .guild-main button.bg-red-700:hover:not(:disabled)),
	:global(.dark .guild-main button.bg-red-500:hover:not(:disabled)) {
		background: #2a1f1a !important;
		color: #f0d4c0 !important;
	}

	/* danger inline link buttons (text-red-600) */
	:global(.guild-main button.text-red-600),
	:global(.guild-main button.text-red-800),
	:global(.guild-main .text-red-600:not(.bg-red-50):not(.bg-red-100)) {
		color: #b55a2f !important;
	}

	:global(.guild-main button.text-blue-600),
	:global(.guild-main button.text-blue-800) {
		color: #5a6f4c !important;
	}

	:global(.dark .guild-main button.text-red-600),
	:global(.dark .guild-main button.text-red-800) {
		color: #d9b8a8 !important;
	}

	:global(.dark .guild-main button.text-blue-600),
	:global(.dark .guild-main button.text-blue-800) {
		color: #8fa67d !important;
	}

	/* status messages (success / error) */
	:global(.guild-main .bg-green-50),
	:global(.guild-main .bg-green-100) {
		background: #eef5e6 !important;
		border: 1px solid #c9d3ba !important;
		color: #3d5a2f !important;
		border-radius: 2px !important;
	}

	:global(.dark .guild-main .bg-green-50),
	:global(.dark .guild-main .bg-green-100) {
		background: #1f2419 !important;
		border-color: #3a4a32 !important;
		color: #9bb085 !important;
	}

	:global(.guild-main .bg-red-50),
	:global(.guild-main .bg-red-100) {
		background: #f9efe8 !important;
		border: 1px solid #d9b8a8 !important;
		color: #7a3a1f !important;
		border-radius: 2px !important;
	}

	:global(.dark .guild-main .bg-red-50),
	:global(.dark .guild-main .bg-red-100) {
		background: #2a1f1a !important;
		border-color: #4a3024 !important;
		color: #d9b8a8 !important;
	}

	/* code inline */
	:global(.guild-main code) {
		background: #f3f0e8 !important;
		color: #5a6f4c !important;
		font-family: 'JetBrains Mono', ui-monospace, monospace !important;
		padding: 0.1rem 0.4rem !important;
		border-radius: 2px !important;
		font-size: 0.85em !important;
	}

	:global(.dark .guild-main code) {
		background: #232321 !important;
		color: #8fa67d !important;
	}

	/* tables */
	:global(.guild-main table) {
		background: transparent !important;
	}

	:global(.guild-main table thead tr) {
		background: #f3f0e8 !important;
		border-bottom: 1px solid #e8e4da !important;
	}

	:global(.guild-main table tbody tr) {
		border-bottom: 1px solid #e8e4da !important;
	}

	:global(.dark .guild-main table thead tr) {
		background: #232321 !important;
		border-bottom-color: #2a2a28 !important;
	}

	:global(.dark .guild-main table tbody tr) {
		border-bottom-color: #2a2a28 !important;
	}

	/* labels */
	:global(.guild-main label) {
		color: #6b6557;
	}

	:global(.dark .guild-main label) {
		color: #a8a293;
	}

	/* small hint text contrast fix — text-xs/sm text-gray-500 was too low contrast on米色 panels */
	:global(.guild-main .text-xs.text-gray-500),
	:global(.guild-main .text-sm.text-gray-500),
	:global(.guild-main .text-gray-500) {
		color: #6b6557 !important;
	}

	:global(.dark .guild-main .text-xs.text-gray-500),
	:global(.dark .guild-main .text-sm.text-gray-500),
	:global(.dark .guild-main .text-gray-500),
	:global(.dark .guild-main .dark\:text-gray-400) {
		color: #a8a293 !important;
	}

	/* hint panel headings (e.g. "可用的變數：") */
	:global(.guild-main .bg-gray-50 .font-medium),
	:global(.guild-main .bg-gray-100 .font-medium) {
		color: #1a1a1a !important;
		font-weight: 500 !important;
	}

	:global(.dark .guild-main .bg-gray-50 .font-medium),
	:global(.dark .guild-main .bg-gray-100 .font-medium) {
		color: #faf9f6 !important;
	}

	/* keep select compact and use custom arrow */
	:global(.guild-main select) {
		padding: 0.55rem 2.25rem 0.55rem 0.85rem !important;
		min-height: 2.5rem !important;
		appearance: none;
		-webkit-appearance: none;
		background-image:
			linear-gradient(45deg, transparent 50%, #6b6557 50%),
			linear-gradient(135deg, #6b6557 50%, transparent 50%);
		background-position:
			calc(100% - 18px) center,
			calc(100% - 13px) center;
		background-size:
			5px 5px,
			5px 5px;
		background-repeat: no-repeat;
	}

	:global(.dark .guild-main select) {
		background-image:
			linear-gradient(45deg, transparent 50%, #a8a293 50%),
			linear-gradient(135deg, #a8a293 50%, transparent 50%);
	}

	:global(.guild-main input[type='text']),
	:global(.guild-main input[type='number']),
	:global(.guild-main input[type='password']),
	:global(.guild-main input[type='email']),
	:global(.guild-main input:not([type])),
	:global(.guild-main textarea) {
		padding: 0.55rem 0.85rem !important;
	}

	/* generic rounded-* removal where used inline */
	:global(.guild-main .rounded-md),
	:global(.guild-main .rounded-lg),
	:global(.guild-main .rounded-xl) {
		border-radius: 2px !important;
	}

	:global(.guild-main .rounded-full) {
		border-radius: 9999px !important;
	}

	/* shadow removal */
	:global(.guild-main .shadow-sm),
	:global(.guild-main .shadow-md),
	:global(.guild-main .shadow-lg),
	:global(.guild-main .shadow-xl) {
		box-shadow: none !important;
	}
</style>
