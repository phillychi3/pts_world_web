<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

	gsap.registerPlugin(ScrollTrigger)

	onMount(() => {
		const sections = gsap.utils.toArray('.fun-section')

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.scroll-section',
				pin: '.pin-section',
				start: 'top top',
				end: '+=200%',
				scrub: 1,
				markers: true,
			}
		})

		gsap.set(sections, {
			xPercent: 400,
			yPercent: 20
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

<div class="h-[300vh] scroll-section">
	<section class="relative overflow-hidden pin-section">
		<div class="track absolute w-full h- top-1/2 -translate-y-1/2"></div>

		<div class="fun-container h-screen flex gap-8 items-center">
			<div class="fun-section card p-8 variant-glass absolute">
				<h1 class="h1 mb-4">抽取老婆</h1>
				<p class="text-lg">每日抽取老婆</p>
			</div>

			<div class="fun-section card p-8 variant-glass absolute">
				<h1 class="h1 mb-4">每日占譜</h1>
				<p class="text-lg">每日抽取老婆</p>
			</div>

			<div class="fun-section card p-8 variant-glass absolute">
				<h1 class="h1 mb-4">抽取貓貓</h1>
				<p class="text-lg">每日抽取老婆</p>
			</div>
		</div>
	</section>
</div>

<style>
	.track {
		border-bottom: 4px dotted rgb(147, 51, 234);
		box-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
	}
</style>
