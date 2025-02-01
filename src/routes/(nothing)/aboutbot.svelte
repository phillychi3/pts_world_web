<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'

	function horizontalLoop(items, direction) {
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
                    ease: 'none',
				},
				0
			)
		})
		return tl
	}

	onMount(() => {
		const rows = gsap.utils.toArray('.bg-slider')
		rows.forEach((row, i) => {
			const items = gsap.utils.toArray('.one-line', row)
			const direction = i % 2 === 0 ? -1 : 1
			horizontalLoop(items, direction).play()
		})
	})
</script>

<section>
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

	section {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		overflow: hidden;
		padding: 2rem 0;
        height: 100vh;
	}

	span {
		font-size: 100px;
		display: inline-block;
	}

    .e-text {
        color: #c42e2e;
    }

    .u-text {
        color: #00000000;
        -webkit-text-stroke: 1px #2d2dc2;
    }
</style>
