<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'

	type IPer = {
		name: string
		hp: number
		maxHp: number
		atk: number
		def: number
		level: number
	}

	let player = {
		name: '玩家',
		hp: 100,
		maxHp: 100,
		atk: 10,
		def: 15,
		level: 1
	}

	let enemy = {
		name: '樹精',
		hp: 101,
		maxHp: 101,
		atk: 20,
		def: 5,
		level: 1
	}

	let battleLogs: string | any[] = []

	let isBattling = false
	let playerTurn = true
	let battleResult = ''

	function calculateDamage(attacker: IPer, defender: IPer, skillMultiplier = 1) {
		const baseDamage = Math.max(1, attacker.atk - defender.def / 2)
		const damage = Math.floor(baseDamage * skillMultiplier)
		return damage
	}

	function normalAttack() {
		if (!isBattling) startBattle()

		const damage = calculateDamage(player, enemy)
		enemy.hp = Math.max(0, enemy.hp - damage)

		addBattleLog(`${player.name}對${enemy.name}造成了${damage}點傷害！`)

		if (enemy.hp <= 0) {
			endBattle(true)
		} else {
			enemyTurn()
		}
	}

	function magicAttack() {
		if (!isBattling) startBattle()

		const damage = calculateDamage(player, enemy, 1.5)
		enemy.hp = Math.max(0, enemy.hp - damage)

		addBattleLog(`${player.name}使用魔法對${enemy.name}造成了${damage}點傷害！`)

		if (enemy.hp <= 0) {
			endBattle(true)
		} else {
			enemyTurn()
		}
	}

	function useItem() {
		if (!isBattling) startBattle()

		const healAmount = 20
		const oldHp = player.hp
		player.hp = Math.min(player.maxHp, player.hp + healAmount)
		const actualHeal = player.hp - oldHp

		addBattleLog(`${player.name}使用物品恢復了${actualHeal}點生命值！`)
		enemyTurn()
	}

	function escape() {
		const escapeChance = Math.random()
		if (escapeChance > 0.3) {
			addBattleLog(`${player.name}成功逃跑了！`)
			endBattle(null)
		} else {
			addBattleLog(`${player.name}嘗試逃跑，但失敗了！`)
			enemyTurn()
		}
	}

	function enemyTurn() {
		playerTurn = false

		setTimeout(() => {
			const damage = calculateDamage(enemy, player)
			player.hp = Math.max(0, player.hp - damage)

			addBattleLog(`${enemy.name}對${player.name}造成了${damage}點傷害！`)

			if (player.hp <= 0) {
				endBattle(false)
			} else {
				playerTurn = true
			}
		}, 1000)
	}

	function startBattle() {
		isBattling = true
		playerTurn = true
		battleLogs = []

		addBattleLog(`戰鬥開始！`)
		addBattleLog(`敵人出現了！是${enemy.name}！`)
	}

	function endBattle(playerWin: boolean | null) {
		isBattling = false

		if (playerWin === true) {
			battleResult = '勝利'
			addBattleLog(`${player.name}獲勝了！`)
		} else if (playerWin === false) {
			battleResult = '失敗'
			addBattleLog(`${player.name}被擊敗了...`)
		} else {
			battleResult = '逃跑'
		}
	}

	function addBattleLog(message: any) {
		battleLogs = [...battleLogs, message]
		setTimeout(() => {
			const logsElement = document.querySelector('.battle-logs')
			if (logsElement) {
				logsElement.scrollTop = logsElement.scrollHeight
			}
		}, 10)
	}

	function resetBattle() {
		player.hp = player.maxHp
		enemy.hp = enemy.maxHp
		battleLogs = []
		isBattling = false
		playerTurn = true
		battleResult = ''
	}

	$: playerHpPercent = (player.hp / player.maxHp) * 100
	$: enemyHpPercent = (enemy.hp / enemy.maxHp) * 100

	onMount(() => {
		gsap.from('.battle-card', {
			y: 20,
			opacity: 0,
			duration: 0.5,
			stagger: 0.2,
			ease: 'back.out(1.7)'
		})

		gsap.utils.toArray('.action-btn').forEach((btn) => {
			const button = btn as HTMLElement
			button.addEventListener('mouseenter', () => {
				gsap.to(button, {
					scale: 1.05,
					duration: 0.2
				})
			})
			button.addEventListener('mouseleave', () => {
				gsap.to(button, {
					scale: 1,
					duration: 0.2
				})
			})
		})
	})
</script>

<h2 class="h2 text-center mb-12">RPG系統</h2>
<section
	class="p-4 bg-gray-800 rounded-lg max-w-2xl mx-auto my-8 text-white shadow-2xl border border-gray-700 font-sans"
>
	<div class="flex items-center mb-4 gap-3">
		<div
			class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden"
		>
			<img
				src="https://cdn.discordapp.com/avatars/1044529058689593435/289ffc05483f3850560da827a9026d07.png"
				alt="Bot Avatar"
				class="w-full h-full object-cover"
			/>
		</div>
		<div class="flex flex-col">
			<div class="flex items-center gap-2">
				<span class="text-yellow-400 font-bold">NothingBot</span>
				<span class="bg-blue-600 text-xs px-2 py-0.5 rounded-full text-white">應用</span>
			</div>
			<span class="text-gray-400 text-xs"
				>今天 下午 {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}</span
			>
		</div>
	</div>

	<div class="pl-12">
		<div class="battle-card bg-gray-900 p-4 rounded-md mb-4 border border-gray-700">
			<h2 class="text-lg font-bold mb-2">戰鬥</h2>
			<p class="text-sm text-gray-400 mb-3">請選擇你的行動</p>

			<div class="grid grid-cols-2 gap-6 mb-4">
				<div class="battle-card">
					<div class="mb-1 flex justify-between">
						<span class="text-sm font-semibold">玩家資料:</span>
						<span class="text-sm text-gray-400">Lv.{player.level}</span>
					</div>

					<div class="flex justify-between mb-1 text-sm">
						<span>血量:{player.hp}</span>
						<div class="w-24 bg-gray-700 rounded-full h-2 overflow-hidden">
							<div
								class="h-full transition-all duration-300"
								style="width: {playerHpPercent}%; background-color: {playerHpPercent > 50
									? '#4ade80'
									: playerHpPercent > 20
										? '#facc15'
										: '#ef4444'}"
							></div>
						</div>
					</div>

					<div class="text-sm">攻擊力:{player.atk} / {10}</div>
					<div class="text-sm">防禦力:{player.def}</div>
				</div>

				<div class="battle-card">
					<div class="mb-1 flex justify-between">
						<span class="text-sm font-semibold">{enemy.name}</span>
						<span class="text-sm text-gray-400">Lv.{enemy.level}</span>
					</div>

					<div class="flex justify-between mb-1 text-sm">
						<span>血量:{enemy.hp}</span>
						<div class="w-24 bg-gray-700 rounded-full h-2 overflow-hidden">
							<div
								class="h-full transition-all duration-300"
								style="width: {enemyHpPercent}%; background-color: {enemyHpPercent > 50
									? '#ef4444'
									: enemyHpPercent > 20
										? '#facc15'
										: '#4ade80'}"
							></div>
						</div>
					</div>

					<div class="text-sm">攻擊力:{enemy.atk}</div>
					<div class="text-sm">防禦力:{enemy.def}</div>
				</div>
			</div>

			<div class="battle-card mb-4">
				<div class="text-sm font-semibold mb-2">紀錄</div>
				<div
					class="battle-logs bg-gray-950 p-2 rounded text-xs text-gray-300 h-20 overflow-y-auto space-y-1"
				>
					{#if battleLogs.length === 0}
						<p class="text-center text-gray-500">......</p>
					{:else}
						{#each battleLogs as log}
							<p>{log}</p>
						{/each}
					{/if}
				</div>
			</div>

			<div class="grid grid-cols-4 gap-2">
				<button
					class="action-btn py-2 px-4 rounded bg-green-700 hover:bg-green-600 text-white text-sm transition-all"
					on:click={normalAttack}
					disabled={!playerTurn || battleResult !== ''}
				>
					普通攻擊
				</button>

				<button
					class="action-btn py-2 px-4 rounded bg-blue-700 hover:bg-blue-600 text-white text-sm transition-all"
					on:click={magicAttack}
					disabled={!playerTurn || battleResult !== ''}
				>
					魔法
				</button>

				<button
					class="action-btn py-2 px-4 rounded bg-amber-700 hover:bg-amber-600 text-white text-sm transition-all"
					on:click={useItem}
					disabled={!playerTurn || battleResult !== ''}
				>
					物品
				</button>

				<button
					class="action-btn py-2 px-4 rounded bg-red-700 hover:bg-red-600 text-white text-sm transition-all"
					on:click={escape}
					disabled={!playerTurn || battleResult !== ''}
				>
					逃跑
				</button>
			</div>
		</div>

		{#if battleResult !== ''}
			<div
				class="battle-card bg-gray-900 p-4 rounded-md border border-gray-700 text-center animate-fadeIn"
			>
				<p class="text-xl font-bold mb-2">
					{#if battleResult === '勝利'}
						<span class="text-green-400">戰鬥勝利！</span>
					{:else if battleResult === '失敗'}
						<span class="text-red-400">戰鬥失敗！</span>
					{:else}
						<span class="text-yellow-400">成功逃跑</span>
					{/if}
				</p>

				<button
					class="mt-2 py-2 px-4 rounded bg-purple-700 hover:bg-purple-600 text-white text-sm transition-all"
					on:click={resetBattle}
				>
					重新開始
				</button>
			</div>
		{/if}
	</div>
</section>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.5s ease-out forwards;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
