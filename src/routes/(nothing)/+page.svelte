<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
	import About from './aboutbot.svelte'
	import Fun from './fun.svelte'
	import Music from './music.svelte'
	import Game from './rpg.svelte'
	import LinkFix from './linkfix.svelte'
	import Security from './security.svelte'
</script>

<svelte:head>
	<title>Nothing bot</title>
</svelte:head>

<section class="hero-minimal">
	<div class="hero-meta hero-meta-top">
		<span>nothing_bot</span>
		<span>est. 2023</span>
	</div>

	<div class="hero-content">
		<h1 class="hero-title">
			<span class="hero-title-fill">Nothing</span>
			<svg
				class="hero-title-svg"
				viewBox="0 0 360 140"
				preserveAspectRatio="xMinYMid meet"
				aria-hidden="true"
			>
				<text
					x="0"
					y="115"
					font-family="'Noto Sans TC', system-ui, sans-serif"
					font-size="140"
					font-style="italic"
					font-weight="200"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					vector-effect="non-scaling-stroke">Bot.</text
				>
			</svg>
		</h1>
		<p class="hero-sub">您的多功能 Discord 機器人助手</p>
	</div>

	<div class="hero-actions">
		<a
			href="https://discord.com/oauth2/authorize?client_id=1044529058689593435&permissions=1641549393014&scope=bot%20applications.commands"
			target="_blank"
			class="hero-link hero-link-primary"
		>
			<span>邀請機器人</span>
			<span class="hero-arrow">→</span>
		</a>
		<a href="https://discord.gg/m6qKNZTaeR" target="_blank" class="hero-link">
			<span>加入支援伺服器</span>
			<span class="hero-arrow">↗</span>
		</a>
	</div>

	<div class="hero-meta hero-meta-bottom">
		<span>scroll_</span>
	</div>
</section>

<div>
	<About />
	<LinkFix />
	<Fun />
	<!-- <Music /> -->
	<Game />
	<Security />
</div>

<section class="features">
	<div class="features-inner">
		<div class="section-head">
			<span class="section-label">— features_</span>
			<h2 class="section-title">更多功能</h2>
		</div>

		<div class="features-grid">
			<article class="feature">
				<div class="feature-num">01</div>
				<h3 class="feature-title">自動管理</h3>
				<p class="feature-desc">自動歡迎、身分組管理、訊息過濾</p>
			</article>
			<article class="feature">
				<div class="feature-num">02</div>
				<h3 class="feature-title">語音管理</h3>
				<p class="feature-desc">鎖碼語音、動態語音、語音移動</p>
			</article>
			<article class="feature">
				<div class="feature-num">03</div>
				<h3 class="feature-title">小遊戲系統</h3>
				<p class="feature-desc">即時對戰、RPG 等多種遊戲玩法</p>
			</article>
		</div>
	</div>
</section>

<section class="rpg">
	<div class="rpg-inner">
		<div class="section-head">
			<span class="section-label">— rpg_system_</span>
			<h2 class="section-title">RPG 冒險系統</h2>
		</div>

		<div class="rpg-list">
			<Accordion class="rpg-accordion">
				<AccordionItem class="rpg-item">
					<svelte:fragment slot="lead"><span class="rpg-mark">+</span></svelte:fragment>
					<svelte:fragment slot="summary">
						<span class="rpg-title">戰鬥系統</span>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p class="rpg-desc">即時回合制戰鬥、技能系統、裝備系統</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem class="rpg-item">
					<svelte:fragment slot="lead"><span class="rpg-mark">+</span></svelte:fragment>
					<svelte:fragment slot="summary">
						<span class="rpg-title">經濟系統</span>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p class="rpg-desc">交易市場、拍賣行、商店系統</p>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</section>

<style>
	.hero-minimal {
		position: relative;
		min-height: 100vh;
		padding: 6rem 2.5rem 3rem;
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 3rem;
		background: #faf9f6;
		color: #1a1a1a;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
	}

	@media (min-width: 768px) {
		.hero-minimal {
			padding: 5rem 5rem 3rem;
		}
	}

	.hero-meta {
		display: flex;
		justify-content: space-between;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.hero-meta-bottom {
		justify-content: flex-end;
		opacity: 0.6;
	}

	.hero-content {
		align-self: end;
		max-width: 1200px;
	}

	.hero-title {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.1em;
		font-size: clamp(4rem, 14vw, 12rem);
		font-weight: 300;
		line-height: 0.95;
		letter-spacing: -0.04em;
		margin: 0;
		color: #1a1a1a;
	}

	.hero-title-fill {
		display: block;
	}

	.hero-title-svg {
		display: block;
		width: clamp(10rem, 36vw, 30rem);
		height: auto;
		color: #1a1a1a;
		overflow: visible;
		shape-rendering: geometricPrecision;
	}

	.hero-sub {
		margin-top: 1.5rem;
		font-size: 1rem;
		font-weight: 300;
		color: #6b6557;
		letter-spacing: 0.02em;
		max-width: 28rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 2.5rem;
		align-items: center;
	}

	.hero-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.95rem;
		font-weight: 400;
		color: #1a1a1a;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid #1a1a1a;
		transition:
			gap 0.4s ease,
			opacity 0.3s ease;
	}

	.hero-link:hover {
		gap: 1.25rem;
	}

	.hero-link-primary::before {
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

	.hero-link-primary:hover::before {
		transform: scaleX(1);
	}

	.hero-arrow {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.9rem;
	}

	:global(body) {
		background: #faf9f6;
	}

	:global(.dark body) {
		background: #1a1a1a;
	}

	:global(.dark) .hero-minimal,
	:global(.dark) .features,
	:global(.dark) .rpg {
		background: #1a1a1a;
		color: #faf9f6;
	}

	:global(.dark) .hero-title,
	:global(.dark) .hero-title-svg {
		color: #faf9f6;
	}

	:global(.dark) .hero-meta,
	:global(.dark) .section-label,
	:global(.dark) .feature-num {
		color: #a8a293;
	}

	:global(.dark) .feature-num {
		color: #8fa67d;
	}

	:global(.dark) .hero-sub,
	:global(.dark) .feature-desc,
	:global(.dark) .rpg-desc {
		color: #a8a293;
	}

	:global(.dark) .hero-link {
		color: #faf9f6;
		border-bottom-color: #faf9f6;
	}

	:global(.dark) .hero-link-primary::before {
		background: #8fa67d;
	}

	:global(.dark) .rpg {
		border-top-color: #2a2a28;
	}

	:global(.dark) .features-grid,
	:global(.dark) .feature {
		border-color: #2a2a28;
	}

	:global(.dark) .feature:hover {
		background: #232321;
	}

	:global(.dark) .feature-title,
	:global(.dark) .rpg-title {
		color: #faf9f6;
	}

	:global(.dark) .rpg-mark {
		color: #8fa67d;
	}

	:global(.rpg-item) {
		border-top-color: #e8e4da;
	}

	:global(.dark .rpg-item) {
		border-top-color: #2a2a28 !important;
	}

	:global(.dark .rpg-item:last-child) {
		border-bottom-color: #2a2a28 !important;
	}
	.features,
	.rpg {
		background: #faf9f6;
		color: #1a1a1a;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
		padding: 8rem 2.5rem;
	}

	.rpg {
		border-top: 1px solid #e8e4da;
	}

	.features-inner,
	.rpg-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 4rem;
	}

	.section-label {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.section-title {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 300;
		letter-spacing: -0.03em;
		line-height: 1;
		margin: 0;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		border-top: 1px solid #e8e4da;
	}

	.feature {
		padding: 3rem 2rem 3rem 0;
		border-bottom: 1px solid #e8e4da;
		border-right: 1px solid #e8e4da;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-left: 2rem;
		transition: background 0.4s ease;
	}

	.feature:hover {
		background: #f3f0e8;
	}

	.feature:last-child {
		border-right: none;
	}

	@media (max-width: 768px) {
		.feature {
			border-right: none;
		}
	}

	.feature-num {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		color: #5a6f4c;
	}

	.feature-title {
		font-size: 1.5rem;
		font-weight: 400;
		margin: 0;
		letter-spacing: -0.01em;
	}

	.feature-desc {
		font-size: 0.9rem;
		font-weight: 300;
		color: #6b6557;
		line-height: 1.7;
		margin: 0;
	}

	.rpg-list {
		max-width: 56rem;
	}

	:global(.rpg-accordion) {
		display: flex;
		flex-direction: column;
	}

	:global(.rpg-item) {
		border-top: 1px solid #e8e4da;
		padding: 1.5rem 0 !important;
		background: transparent !important;
		border-radius: 0 !important;
	}

	:global(.rpg-item:last-child) {
		border-bottom: 1px solid #e8e4da;
	}

	.rpg-mark {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 1.25rem;
		font-weight: 300;
		color: #5a6f4c;
		display: inline-block;
		width: 1.5rem;
	}

	.rpg-title {
		font-size: 1.25rem;
		font-weight: 400;
		color: #1a1a1a;
		letter-spacing: -0.01em;
	}

	.rpg-desc {
		font-size: 0.9rem;
		font-weight: 300;
		color: #6b6557;
		line-height: 1.7;
		padding: 1rem 0 0.5rem 2.25rem;
		margin: 0;
	}
</style>
