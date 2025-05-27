<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'

	function horizontalLoop(items: any[], direction: number) {
		items = gsap.utils.toArray(items)
		const tl = gsap.timeline({
			repeat: -1,
			defaults: { ease: 'none' }
		})
		const startPosition = direction > 0 ? -200 : 0
		gsap.set(items, { xPercent: startPosition })

		const moveAmount = direction > 0 ? -100 : -100
		items.forEach((item) => {
			tl.to(
				item,
				{
					xPercent: moveAmount,
					duration: 3,
					ease: 'none'
				},
				0
			)
		})
		return tl
	}

	onMount(() => {
		const rows = gsap.utils.toArray('.bg-slider')
		rows.forEach((row, i) => {
			const items = gsap.utils.toArray('.one-line', row as HTMLElement)
			const direction = i % 2 === 0 ? -1 : 1
			horizontalLoop(items, direction).play()
		})
	})
</script>

<section class=" relative flex flex-col gap-8 overflow-hidden min-h-screen">
	<div class="bg-slider">
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
	</div>
	<div class="bg-slider">
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
	</div>
	<div class="bg-slider">
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
	</div>
	<div class="bg-slider">
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
		<div class="one-line">
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
			<div>
				<span class="e-text">Easy</span>
				<span class="u-text">Use</span>
			</div>
		</div>
	</div>
</section>

<style>
	.bg-slider {
		position: relative;
		display: flex;
		gap: 1rem;
		white-space: nowrap;
		overflow: hidden;
	}

	.one-line {
		display: flex;
		gap: 1rem;
		padding: 5px;
		margin-top: 20px;
	}

	span {
		font-size: 100px;
		display: inline-block;
	}

	.e-text {
		color: rgb(var(--color-primary-500));
	}

	.u-text {
		color: transparent;
		-webkit-text-stroke: 1px rgb(var(--color-secondary-600));
	}

	:global(.dark) .e-text {
		color: rgb(var(--color-primary-500));
	}

	:global(.dark) .u-text {
		-webkit-text-stroke: 1px rgb(var(--color-secondary-300));
	}
</style>
