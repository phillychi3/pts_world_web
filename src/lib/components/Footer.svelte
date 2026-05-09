<script>
	import { base } from '$app/paths'
</script>

<footer class="site-footer">
	<div class="footer-top">
		<div class="footer-brand">
			<div class="brand-row">
				<span class="brand-name">nothing_bot</span>
			</div>
			<div class="brand-tag">Discord 多功能機器人</div>
		</div>

		<div class="footer-cols">
			<div class="footer-col">
				<div class="col-head">about_</div>
				<a href={base}>首頁</a>
				<span class="muted">使用教學</span>
				<a href="https://github.com/phillychi3/pts_world_web" target="_blank">開源連結</a>
			</div>
			<div class="footer-col">
				<div class="col-head">community_</div>
				<a href="https://discord.gg/m6qKNZTaeR">支援伺服器</a>
				<a href="https://discordservers.tw/bots/1044529058689593435">Discord TW</a>
				<span class="muted">Bots.gg</span>
				<a href="https://top.gg/bot/1044529058689593435">top.gg</a>
			</div>
			<div class="footer-col">
				<div class="col-head">legal_</div>
				<a href="{base}/">隱私權政策</a>
				<a href="{base}/">使用條款</a>
				<span class="muted">聯絡我們</span>
			</div>
		</div>
	</div>

	<div class="footer-bottom">
		<span>© 2023–2025 nothing_bot</span>
		<span class="dot">·</span>
		<span>made_with_care</span>
	</div>
</footer>

<style>
	.site-footer {
		background: #faf9f6;
		color: #1a1a1a;
		border-top: 1px solid #e8e4da;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
		font-weight: 300;
	}

	.footer-top {
		max-width: 1300px;
		margin: 0 auto;
		padding: 5rem 2.5rem 3rem;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	@media (min-width: 1024px) {
		.footer-top {
			flex-direction: row;
			justify-content: space-between;
			gap: 6rem;
		}
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.brand-row {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.95rem;
	}

	.brand-tag {
		color: #6b6557;
		font-size: 0.85rem;
		letter-spacing: 0.02em;
	}

	.footer-cols {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 3rem;
	}

	@media (max-width: 640px) {
		.footer-cols {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		font-size: 0.85rem;
	}

	.col-head {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
		margin-bottom: 0.4rem;
	}

	.footer-col a {
		color: #1a1a1a;
		width: fit-content;
		position: relative;
		padding-bottom: 2px;
	}

	.footer-col a::after {
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

	.footer-col a:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.muted {
		color: #b5ad9d;
	}

	.footer-bottom {
		max-width: 1300px;
		margin: 0 auto;
		padding: 1.5rem 2.5rem 2rem;
		border-top: 1px solid #e8e4da;
		display: flex;
		gap: 0.75rem;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		color: #8a8478;
		text-transform: lowercase;
	}

	.dot {
		opacity: 0.5;
	}

	:global(.dark) .site-footer {
		background: #1a1a1a;
		color: #faf9f6;
		border-top-color: #2a2a28;
	}

	:global(.dark) .footer-bottom {
		border-top-color: #2a2a28;
	}

	:global(.dark) .footer-col a {
		color: #faf9f6;
	}

	:global(.dark) .footer-col a::after {
		background: #faf9f6;
	}

	:global(.dark) .brand-tag,
	:global(.dark) .col-head,
	:global(.dark) .footer-bottom {
		color: #a8a293;
	}

	:global(.dark) .muted {
		color: #5a564e;
	}
</style>
