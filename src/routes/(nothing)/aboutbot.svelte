<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'

	const rows = [
		['Easy_Use', 'Auto_Welcome', 'Voice_Move', 'Filter_Spam'],
		['Role_Manager', 'RPG_World', 'Music_Play', 'Lock_Voice'],
		['Mini_Games', 'Server_Tools', 'Quick_Setup', 'Open_Source'],
		['Easy_Use', 'Auto_Welcome', 'Voice_Move', 'Filter_Spam']
	]

	function horizontalLoop(items: any[], direction: number) {
		items = gsap.utils.toArray(items)
		const tl = gsap.timeline({
			repeat: -1,
			defaults: { ease: 'none' }
		})
		const startPosition = direction > 0 ? -200 : 0
		gsap.set(items, { xPercent: startPosition })

		items.forEach((item) => {
			tl.to(item, { xPercent: -100, duration: 8, ease: 'none' }, 0)
		})
		return tl
	}

	onMount(() => {
		const sliders = gsap.utils.toArray('.bg-slider')
		sliders.forEach((row, i) => {
			const items = gsap.utils.toArray('.one-line', row as HTMLElement)
			const direction = i % 2 === 0 ? -1 : 1
			horizontalLoop(items, direction).play()
		})
	})
</script>

<section class="about">
	<div class="about-meta">
		<span>— about_</span>
	</div>

	{#each rows as words, rowIndex}
		<div class="bg-slider">
			{#each Array.from({ length: 3 }) as _, copyIndex}
				<div class="one-line">
					{#each words as word, wordIndex}
						<span class={(rowIndex + copyIndex + wordIndex) % 2 === 0 ? 'fill' : 'soft'}>
							{word}
						</span>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
</section>

<style>
	.about {
		position: relative;
		min-height: 100vh;
		background: #faf9f6;
		color: #1a1a1a;
		padding: 6rem 0 8rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		overflow: hidden;
		border-top: 1px solid #e8e4da;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
	}

	.about-meta {
		padding: 0 2.5rem 2rem;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.bg-slider {
		position: relative;
		display: flex;
		gap: 2.5rem;
		white-space: nowrap;
		overflow: hidden;
	}

	.one-line {
		display: flex;
		gap: 2.5rem;
		flex-shrink: 0;
	}

	.one-line span {
		font-family: 'Noto Sans TC', system-ui, sans-serif;
		font-weight: 300;
		font-size: clamp(3rem, 8vw, 7rem);
		line-height: 1;
		letter-spacing: -0.03em;
		display: inline-block;
	}

	.fill {
		color: #1a1a1a;
	}

	.soft {
		color: #d8d3c5;
	}

	:global(.dark) .about {
		background: #1a1a1a;
		color: #faf9f6;
		border-top-color: #2a2a28;
	}

	:global(.dark) .about-meta {
		color: #a8a293;
	}

	:global(.dark) .fill {
		color: #faf9f6;
	}

	:global(.dark) .soft {
		color: #2e2c28;
	}
</style>
