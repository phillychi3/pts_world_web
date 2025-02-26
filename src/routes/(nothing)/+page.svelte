<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
	import About from './aboutbot.svelte'
    import Fun from './fun.svelte'
    import Music from './music.svelte'
    import Game from './rpg.svelte'
</script>

<svelte:head>
	<title>Nothing bot</title>
</svelte:head>

<div class="min-h-screen from-surface-900 to-surface-800">
	<div class="mx-auto px-4 py-32 text-center">
		<h1 class="text-4xl md:text-6xl lg:text-[100px] text-primary-500 mb-10 break-words">
			Nothing Bot
		</h1>
		<p class="mb-12 text-3xl md:text-4xl">您的多功能 Discord 機器人助手</p>
		<div class="flex justify-center gap-4">
			<a
				href="https://discord.com/oauth2/authorize?client_id=1044529058689593435&permissions=1641549393014&scope=bot%20applications.commands"
				target="_blank"
				class="btn variant-filled-primary">邀請機器人</a
			>
			<a href="https://discord.gg/m6qKNZTaeR" target="_blank" class="btn variant-filled"
				>加入支援伺服器</a
			>
		</div>
	</div>
</div>
<About />
<Fun />
<Music />
<Game />
<div class="container mx-auto px-4 py-16">
	<h2 class="h2 text-center mb-12">更多功能</h2>

	<div class="grid md:grid-cols-3 gap-8">
		<div class="card card-hover p-6">
			<i class="fa-solid fa-robot text-4xl text-primary-500 mb-4"></i>
			<h3 class="h3 mb-4">自動管理</h3>
			<p>自動歡迎、身分組管理、訊息過濾</p>
		</div>

		<div class="card card-hover p-6">
			<i class="fa-solid fa-music text-4xl text-primary-500 mb-4"></i>
			<h3 class="h3 mb-4">音樂功能</h3>
			<p>播放 YouTube、Spotify 等多平台音樂</p>
		</div>

		<div class="card card-hover p-6">
			<i class="fa-solid fa-gamepad text-4xl text-primary-500 mb-4"></i>
			<h3 class="h3 mb-4">小遊戲系統</h3>
			<p>即時對戰、RPG 等多種遊戲玩法</p>
		</div>
	</div>
</div>
<!-- RPG功能 -->
<div class="container mx-auto px-4 py-16">
	<h2 class="h2 text-center mb-12">RPG 冒險系統</h2>
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="lead">⚔️</svelte:fragment>
			<svelte:fragment slot="summary">戰鬥系統</svelte:fragment>
			<svelte:fragment slot="content">
				<p>即時回合制戰鬥、技能系統、裝備系統</p>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">💰</svelte:fragment>
			<svelte:fragment slot="summary">經濟系統</svelte:fragment>
			<svelte:fragment slot="content">
				<p>交易市場、拍賣行、商店系統</p>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>
