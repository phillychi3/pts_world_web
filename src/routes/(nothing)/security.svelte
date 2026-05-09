<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

	gsap.registerPlugin(ScrollTrigger)

	const items = [
		{
			id: 'honeypot',
			name: '蜜罐機制',
			desc: '設定誘餌頻道，自動偵測並隔離可疑帳號'
		},
		{
			id: 'quarantine',
			name: '隔離區',
			desc: '可疑成員自動隔離，避免汙染整個伺服器'
		},
		{
			id: 'anti_phish',
			name: '釣魚連結偵測',
			desc: '即時比對黑名單，自動移除釣魚連結與訊息'
		},
		{
			id: '4fish',
			name: '4fish 防護',
			desc: '阻擋常見的釣魚工具與帳號類型'
		},
		{
			id: 'spam',
			name: '垃圾訊息檢測',
			desc: '判斷重複、轟炸、洗版訊息並自動處置'
		},
		{
			id: 'userspam',
			name: 'User Install 防護',
			desc: '阻擋利用 user-install app 進行的垃圾推送'
		}
	]

	onMount(() => {
		gsap.from('.sec-cell', {
			opacity: 0,
			y: 16,
			duration: 0.7,
			stagger: 0.08,
			ease: 'power2.out',
			scrollTrigger: { trigger: '.sec-grid', start: 'top 75%' }
		})
	})
</script>

<section class="sec">
	<div class="sec-inner">
		<div class="sec-head">
			<span class="sec-meta">— security_</span>
			<h2 class="sec-title">伺服器防護</h2>
			<p class="sec-sub">
				六層防護機制，從蜜罐、隔離區到釣魚與垃圾訊息檢測，<br />讓你的伺服器自動應對各種威脅。
			</p>
		</div>

		<div class="sec-grid">
			{#each items as item, i}
				<article class="sec-cell">
					<div class="sec-num">0{i + 1}</div>
					<div class="sec-id">{item.id}_</div>
					<h3 class="sec-name">{item.name}</h3>
					<p class="sec-desc">{item.desc}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.sec {
		background: #faf9f6;
		color: #1a1a1a;
		padding: 8rem 2.5rem;
		border-top: 1px solid #e8e4da;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
	}

	.sec-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.sec-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 4rem;
	}

	.sec-meta {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.sec-title {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 300;
		letter-spacing: -0.03em;
		line-height: 1;
		margin: 0;
	}

	.sec-sub {
		font-size: 0.95rem;
		font-weight: 300;
		color: #6b6557;
		line-height: 1.8;
		max-width: 32rem;
		margin: 0;
	}

	.sec-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		border-top: 1px solid #e8e4da;
		border-left: 1px solid #e8e4da;
	}

	.sec-cell {
		padding: 2.5rem 2rem;
		border-right: 1px solid #e8e4da;
		border-bottom: 1px solid #e8e4da;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		transition: background 0.4s ease;
	}

	.sec-cell:hover {
		background: #f3f0e8;
	}

	.sec-num {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.2em;
		color: #5a6f4c;
	}

	.sec-id {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		color: #b5ad9d;
		letter-spacing: 0.05em;
	}

	.sec-name {
		font-size: 1.35rem;
		font-weight: 400;
		letter-spacing: -0.01em;
		margin: 0;
		margin-top: 0.25rem;
	}

	.sec-desc {
		font-size: 0.85rem;
		font-weight: 300;
		color: #6b6557;
		line-height: 1.7;
		margin: 0;
	}

	:global(.dark) .sec {
		background: #1a1a1a;
		color: #faf9f6;
		border-top-color: #2a2a28;
	}

	:global(.dark) .sec-meta,
	:global(.dark) .sec-sub,
	:global(.dark) .sec-desc {
		color: #a8a293;
	}

	:global(.dark) .sec-grid,
	:global(.dark) .sec-cell {
		border-color: #2a2a28;
	}

	:global(.dark) .sec-cell:hover {
		background: #232321;
	}

	:global(.dark) .sec-num {
		color: #8fa67d;
	}

	:global(.dark) .sec-id {
		color: #5a564e;
	}

	:global(.dark) .sec-name {
		color: #faf9f6;
	}
</style>
