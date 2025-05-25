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

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-black">
	<div class="mx-auto px-4 py-32 text-center">
		<h1
			class="text-4xl md:text-6xl lg:text-[100px] text-white mb-10 break-words font-bold tracking-tight"
		>
			Nothing Bot
		</h1>
		<p class="mb-12 text-3xl md:text-4xl text-gray-300 font-light">您的多功能 Discord 機器人助手</p>
		<div class="flex justify-center gap-4">
			<a
				href="https://discord.com/oauth2/authorize?client_id=1044529058689593435&permissions=1641549393014&scope=bot%20applications.commands"
				target="_blank"
				class="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
			>
				邀請機器人
			</a>
			<a
				href="https://discord.gg/m6qKNZTaeR"
				target="_blank"
				class="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
			>
				加入支援伺服器
			</a>
		</div>
	</div>
</div>

<div>
	<About />
	<Fun />
	<Music />
	<Game />
</div>

<div class="py-16">
	<div class="container mx-auto px-4">
		<h2 class="text-4xl font-bold text-center mb-12 text-gray-900">更多功能</h2>

		<div class="grid md:grid-cols-3 gap-8">
			<div
				class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
			>
				<i class="fa-solid fa-robot text-5xl text-gray-800 mb-6"></i>
				<h3 class="text-2xl font-bold mb-4 text-gray-900">自動管理</h3>
				<p class="text-gray-600 leading-relaxed">自動歡迎、身分組管理、訊息過濾</p>
			</div>

			<div
				class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
			>
				<i class="fa-solid fa-music text-5xl text-gray-800 mb-6"></i>
				<h3 class="text-2xl font-bold mb-4 text-gray-900">音樂功能</h3>
				<p class="text-gray-600 leading-relaxed">播放 YouTube、Spotify 等多平台音樂</p>
			</div>

			<div
				class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
			>
				<i class="fa-solid fa-gamepad text-5xl text-gray-800 mb-6"></i>
				<h3 class="text-2xl font-bold mb-4 text-gray-900">小遊戲系統</h3>
				<p class="text-gray-600 leading-relaxed">即時對戰、RPG 等多種遊戲玩法</p>
			</div>
		</div>
	</div>
</div>

<!-- RPG功能 -->
<div class="py-16">
	<div class="container mx-auto px-4">
		<h2 class="text-4xl font-bold text-center mb-12 text-gray-900">RPG 冒險系統</h2>
		<div class="max-w-4xl mx-auto">
			<Accordion class="space-y-4">
				<AccordionItem
					class="bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
				>
					<svelte:fragment slot="lead">
						<span class="text-2xl">⚔️</span>
					</svelte:fragment>
					<svelte:fragment slot="summary">
						<span class="text-xl font-semibold text-gray-900">戰鬥系統</span>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p class="text-gray-600 leading-relaxed p-4">即時回合制戰鬥、技能系統、裝備系統</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem
					class="bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
				>
					<svelte:fragment slot="lead">
						<span class="text-2xl">💰</span>
					</svelte:fragment>
					<svelte:fragment slot="summary">
						<span class="text-xl font-semibold text-gray-900">經濟系統</span>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<p class="text-gray-600 leading-relaxed p-4">交易市場、拍賣行、商店系統</p>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</div>
