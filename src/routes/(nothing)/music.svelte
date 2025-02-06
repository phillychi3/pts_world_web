<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

	gsap.registerPlugin(ScrollTrigger)

	let currentPlatform = 'soundcloud'

	onMount(() => {
		gsap.set('.fixed', { opacity: 0, x: '-100%' })
		ScrollTrigger.create({
			trigger: '#musicplace',
			start: 'top bottom',
			end: 'bottom top',
			onUpdate: (self) => {
				const progress = self.progress
				const start = 0.1
				const end = 0.9

				let opacity = 0
				let xPos = '-100%'

				if (progress < start) {
					opacity = 0
					xPos = '-100%'
				} else if (progress > end) {
					opacity = 0
					xPos = '-100%'
				} else {
					if (progress < 0.2) {
						opacity = (progress - start) / (0.2 - start)
					} else if (progress > 0.8) {
						opacity = 1 - (progress - 0.8) / (end - 0.8)
					} else {
						opacity = 1
					}
					xPos = '0%'
				}

				gsap.set('.fixed', {
					opacity: Math.max(0, Math.min(1, opacity)),
					x: xPos
				})
			}
		})

		const rotationTl = gsap.timeline({ repeat: -1 })
		rotationTl.to('#cd', {
			rotation: 360,
			duration: 20,
			ease: 'none'
		})

		const platformTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.container',
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
				onUpdate: (self) => {
					currentPlatform = self.progress > 0.5 ? 'youtube' : 'soundcloud'
				}
			}
		})
		platformTl.to('#platform-display', {
			backgroundColor: '#ff0000',
			duration: 1
		})
		gsap.to('.youtube-content', {
			scrollTrigger: {
				trigger: '.youtube-content',
				start: 'top center',
				toggleClass: 'active'
			},
			opacity: 1,
			y: 0,
			duration: 0.5
		})
	})
</script>

<div class="min-h-[200vh]" id="musicplace">
	<div class="fixed top-0 left-0 h-screen w-1/2 flex items-center">
		<div class="relative w-96 h-96 -ml-48">
			<div id="cd" class="absolute inset-0">
				<div
					class="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg flex items-center justify-center overflow-hidden"
				>
					<div class="w-8 h-8 bg-gray-900 rounded-full border-4 border-gray-600 z-10" />
					<div class="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-transparent" />
					<div
						id="platform-display"
						class="absolute right-0 top-0 w-1/2 h-full overflow-hidden rounded-r-full transition-colors duration-300"
						class:bg-orange-500={currentPlatform === 'soundcloud'}
						class:bg-red-600={currentPlatform === 'youtube'}
					>
						<div class="w-full h-full flex items-center justify-center">
							<span class="text-white font-bold text-lg rotate-90 uppercase">
								{currentPlatform}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div class="container ml-auto w-1/2 min-h-screen">

		<section class="h-screen flex items-center p-8">
			<div class="">
				<h2 class="text-4xl font-bold mb-4 text-orange-500">SoundCloud</h2>
				<p class="text-lg mb-4">
					Stream your favorite music directly from SoundCloud. Discover new artists and tracks.
				</p>
				<ul class="space-y-2">
					<li class="flex items-center">
						<span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
						Stream millions of tracks
					</li>
					<li class="flex items-center">
						<span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
						Follow your favorite artists
					</li>
					<li class="flex items-center">
						<span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
						Create and share playlists
					</li>
				</ul>
			</div>
		</section>


		<section class="youtube-content h-screen flex items-center p-8 opacity-0 translate-y-8">
			<div class="">
				<h2 class="text-4xl font-bold mb-4 text-red-600">YouTube</h2>
				<p class="text-lg mb-4">
					Watch music videos and live performances on YouTube. Access the world's largest video
					platform.
				</p>
				<ul class="space-y-2">
					<li class="flex items-center">
						<span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
						Watch official music videos
					</li>
					<li class="flex items-center">
						<span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
						Discover live performances
					</li>
					<li class="flex items-center">
						<span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
						Create video playlists
					</li>
				</ul>
			</div>
		</section>
	</div>
</div>
