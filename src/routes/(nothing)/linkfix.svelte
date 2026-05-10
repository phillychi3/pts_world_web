<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

	gsap.registerPlugin(ScrollTrigger)

	const fixes = [
		{ from: 'twitter.com/user/status/...', to: 'fxtwitter.com/user/status/...', label: 'Twitter' },
		{ from: 'pixiv.net/artworks/...', to: 'Embed', label: 'Pixiv' },
		{ from: 'nhentai.net/g/...', to: 'Embed', label: 'nhentai' },
		{ from: 'e-hentai.org/g/...', to: 'Embed', label: 'E(x)hentai' }
	]

	onMount(() => {
		gsap.from('.linkfix-row', {
			opacity: 0,
			y: 20,
			duration: 0.8,
			stagger: 0.1,
			ease: 'power2.out',
			scrollTrigger: { trigger: '.linkfix-list', start: 'top 75%' }
		})
	})
</script>

<section class="linkfix">
	<div class="linkfix-inner">
		<div class="linkfix-head">
			<span class="linkfix-meta">— link_fix_</span>
			<h2 class="linkfix-title">連結修正</h2>
			<p class="linkfix-sub">
				自動將社群網站連結轉換為可在 Discord 內預覽的版本，<br />讓你不用點開外部連結也能看到內容。
			</p>
		</div>

		<div class="linkfix-list">
			{#each fixes as fix, i}
				<div class="linkfix-row">
					<div class="linkfix-num">0{i + 1}</div>
					<div class="linkfix-label">{fix.label}</div>
					<div class="linkfix-pair">
						<code class="linkfix-from">{fix.from}</code>
						<span class="linkfix-arrow">→</span>
						<code class="linkfix-to">{fix.to}</code>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.linkfix {
		background: #faf9f6;
		color: #1a1a1a;
		padding: 8rem 2.5rem;
		border-top: 1px solid #e8e4da;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
	}

	.linkfix-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.linkfix-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 5rem;
	}

	.linkfix-meta {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.linkfix-title {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 300;
		letter-spacing: -0.03em;
		line-height: 1;
		margin: 0;
	}

	.linkfix-sub {
		font-size: 0.95rem;
		font-weight: 300;
		color: #6b6557;
		line-height: 1.8;
		max-width: 32rem;
		margin: 0;
	}

	.linkfix-list {
		display: flex;
		flex-direction: column;
	}

	.linkfix-row {
		display: grid;
		grid-template-columns: auto 7rem 1fr;
		align-items: center;
		gap: 2rem;
		padding: 1.75rem 0;
		border-top: 1px solid #e8e4da;
	}

	.linkfix-row:last-child {
		border-bottom: 1px solid #e8e4da;
	}

	.linkfix-num {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		color: #5a6f4c;
	}

	.linkfix-label {
		font-size: 1rem;
		font-weight: 400;
		letter-spacing: -0.01em;
	}

	.linkfix-pair {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.85rem;
	}

	.linkfix-from {
		color: #a8a293;
		text-decoration: line-through;
		text-decoration-color: #c9c4b6;
	}

	.linkfix-arrow {
		color: #5a6f4c;
		font-size: 1rem;
	}

	.linkfix-to {
		color: #1a1a1a;
		position: relative;
		padding-bottom: 2px;
	}

	.linkfix-to::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
		background: #1a1a1a;
	}

	@media (max-width: 768px) {
		.linkfix-row {
			grid-template-columns: auto 1fr;
			grid-template-rows: auto auto;
			gap: 0.5rem 1.5rem;
		}

		.linkfix-pair {
			grid-column: 1 / -1;
		}
	}

	:global(.dark) .linkfix {
		background: #1a1a1a;
		color: #faf9f6;
		border-top-color: #2a2a28;
	}

	:global(.dark) .linkfix-meta,
	:global(.dark) .linkfix-sub {
		color: #a8a293;
	}

	:global(.dark) .linkfix-num,
	:global(.dark) .linkfix-arrow {
		color: #8fa67d;
	}

	:global(.dark) .linkfix-row {
		border-top-color: #2a2a28;
	}

	:global(.dark) .linkfix-row:last-child {
		border-bottom-color: #2a2a28;
	}

	:global(.dark) .linkfix-from {
		color: #5a564e;
		text-decoration-color: #3a3833;
	}

	:global(.dark) .linkfix-to {
		color: #faf9f6;
	}

	:global(.dark) .linkfix-to::after {
		background: #faf9f6;
	}
</style>
