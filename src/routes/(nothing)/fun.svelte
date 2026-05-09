<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

	gsap.registerPlugin(ScrollTrigger)

	onMount(() => {
		const sections = gsap.utils.toArray<HTMLElement>('.fun-section')
		const container = document.querySelector('.fun-container')

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.scroll-section',
				pin: '.pin-section',
				start: 'top top',
				end: '+=200%',
				scrub: 1
			}
		})

		gsap.set(container, {
			xPercent: 100,
			opacity: 1
		})

		gsap.set(sections, {
			xPercent: 500,
			yPercent: 0
		})

		tl.to(container, {
			xPercent: -100,
			duration: 1.5,
			ease: 'none'
		})

		sections.forEach((section, i) => {
			tl.to(
				section,
				{
					xPercent: -100,
					yPercent: 20,
					duration: 1,
					ease: 'none'
				},
				i * 0.2
			)
		})
	})
</script>

<div class="fun-wrap">
	<div class="fun-meta">— fun_</div>

	<div class="scroll-section h-[300vh]">
		<section class="pin-section relative overflow-hidden">
			<div class="track" />

			<div class="fun-container h-screen flex gap-8 items-center">
				<div class="fun-section absolute">
					<div class="fun-num">01</div>
					<h3 class="fun-title">抽取老婆</h3>
					<p class="fun-desc">每日抽取老婆</p>
				</div>

				<div class="fun-section absolute">
					<div class="fun-num">02</div>
					<h3 class="fun-title">每日占譜</h3>
					<p class="fun-desc">獲取最新的運勢</p>
				</div>

				<div class="fun-section absolute">
					<div class="fun-num">03</div>
					<h3 class="fun-title">抽取貓貓</h3>
					<p class="fun-desc">獲取貓咪圖片</p>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	.fun-wrap {
		background: #faf9f6;
		color: #1a1a1a;
		border-top: 1px solid #e8e4da;
		font-family: 'Noto Sans TC', system-ui, sans-serif;
	}

	.fun-meta {
		max-width: 1300px;
		margin: 0 auto;
		padding: 6rem 2.5rem 0;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8a8478;
	}

	.track {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 1px;
		background: repeating-linear-gradient(
			to right,
			#1a1a1a 0,
			#1a1a1a 4px,
			transparent 4px,
			transparent 12px
		);
		opacity: 0.35;
	}

	.fun-section {
		min-width: 18rem;
		max-width: 22rem;
		padding: 2.5rem;
		background: #faf9f6;
		border: 1px solid #e8e4da;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.fun-num {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		color: #5a6f4c;
	}

	.fun-title {
		font-size: 2rem;
		font-weight: 300;
		letter-spacing: -0.02em;
		line-height: 1;
		margin: 0;
	}

	.fun-desc {
		font-size: 0.9rem;
		font-weight: 300;
		color: #6b6557;
		line-height: 1.7;
		margin: 0;
	}

	:global(.dark) .fun-wrap {
		background: #1a1a1a;
		color: #faf9f6;
		border-top-color: #2a2a28;
	}

	:global(.dark) .fun-meta {
		color: #a8a293;
	}

	:global(.dark) .track {
		background: repeating-linear-gradient(
			to right,
			#faf9f6 0,
			#faf9f6 4px,
			transparent 4px,
			transparent 12px
		);
		opacity: 0.25;
	}

	:global(.dark) .fun-section {
		background: #1a1a1a;
		border-color: #2a2a28;
	}

	:global(.dark) .fun-num {
		color: #8fa67d;
	}

	:global(.dark) .fun-desc {
		color: #a8a293;
	}
</style>
