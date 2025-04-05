<script lang="ts">
	import { onMount } from 'svelte'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'

	gsap.registerPlugin(ScrollTrigger)

	let currentPlatform = 'soundcloud'
	let currentTrack = {
		title: 'Sample Track',
		artist: 'Sample Artist',
		duration: '3:45',
		currentTime: '1:22'
	}
	let isPlaying = false
	let isMobile = false
	let isloading = true

	function togglePlay() {
		isPlaying = !isPlaying
	}

	function checkMobile() {
		isMobile = window.innerWidth < 768
	}

	onMount(() => {
		checkMobile()

		window.addEventListener('resize', checkMobile)
		isloading = false

		if (!isMobile) {
			gsap.set('.music-player', {
				opacity: 0,
				x: '-100%'
			})
			;(ScrollTrigger as any).create({
				trigger: '#musicplace',
				start: 'top 80%',
				end: 'bottom 20%',
				onEnter: () => {
					gsap.to('.music-player', {
						opacity: 1,
						x: '0%',
						duration: 0.5,
						ease: 'power2.out'
					})
				},
				onLeave: () => {
					gsap.to('.music-player', {
						opacity: 0,
						x: '-100%',
						duration: 0.5,
						ease: 'power2.in'
					})
				},
				onEnterBack: () => {
					gsap.to('.music-player', {
						opacity: 1,
						x: '0%',
						duration: 0.5,
						ease: 'power2.out'
					})
				},
				onLeaveBack: () => {
					gsap.to('.music-player', {
						opacity: 0,
						x: '-100%',
						duration: 0.5,
						ease: 'power2.in'
					})
				}
			})

			const platformTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.container',
					start: 'top top',
					end: 'bottom bottom',
					scrub: true,
					onUpdate: (self) => {
						currentPlatform = self.progress > 0.5 ? 'youtube' : 'soundcloud'

						if (currentPlatform === 'youtube') {
							const musicPlayer = document.querySelector('.music-player')
							if (musicPlayer) {
								musicPlayer.classList.add('youtube-player')
								musicPlayer.classList.remove('soundcloud-player')
							}
						} else {
							const musicPlayer = document.querySelector('.music-player')
							if (musicPlayer) {
								musicPlayer.classList.add('soundcloud-player')
								musicPlayer.classList.remove('youtube-player')
							}
						}
					}
				}
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
		} else {
			gsap.set('.youtube-content', {
				opacity: 1,
				y: 0
			})
		}

		return () => {
			window.removeEventListener('resize', checkMobile)
		}
	})
</script>

<div class="min-h-[200vh]" id="musicplace">
	{#if !isMobile}
		<div
			class="music-player fixed left-0 top-1/4 w-64 shadow-xl z-30 rounded-r-lg p-4 transition-all duration-300 {isloading
				? 'hidden'
				: ''}"
			class:soundcloud-player={currentPlatform === 'soundcloud'}
			class:youtube-player={currentPlatform === 'youtube'}
		>
			<div class="platform-indicator text-center mb-3">
				<span class="text-white font-bold text-lg uppercase bg-opacity-80 px-3 py-1 rounded-full">
					{currentPlatform}
				</span>
			</div>

			<div
				class="album-art bg-gray-700 w-full aspect-square rounded-lg mb-4 overflow-hidden flex items-center justify-center"
			>
				{#if currentPlatform === 'soundcloud'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="w-12 h-12 text-orange-500 fill-current"
					>
						<path
							d="M11.56,8.87V17H20.32V17C22.17,16.87 23,15.73 23,14.33C23,12.85 21.88,11.66 20.38,11.66C20,11.66 19.68,11.74 19.35,11.88C19.11,9.54 17.12,7.71 14.67,7.71C13.5,7.71 12.39,8.15 11.56,8.87M10.68,9.89C10.38,9.71 10.06,9.57 9.71,9.5V17H11.1V9.34C10.95,9.5 10.81,9.7 10.68,9.89M8.33,9.35V17H9.25V9.38C9.06,9.35 8.87,9.34 8.67,9.34C8.55,9.34 8.44,9.34 8.33,9.35M6.5,10V17H7.41V9.54C7.08,9.65 6.77,9.81 6.5,10M4.83,12.5C4.77,12.5 4.71,12.44 4.64,12.41V17H5.56V10.86C5.19,11.34 4.94,11.91 4.83,12.5M2.79,12.22V16.91C3,16.97 3.24,17 3.5,17H3.72V12.14C3.64,12.13 3.56,12.12 3.5,12.12C3.24,12.12 3,12.16 2.79,12.22M1,14.56C1,15.31 1.34,15.97 1.87,16.42V12.71C1.34,13.15 1,13.82 1,14.56Z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="w-12 h-12 text-red-600 fill-current"
					>
						<path
							d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
						/>
					</svg>
				{/if}
			</div>

			<div class="track-info mb-3">
				<div class="text-lg font-semibold mb-1 text-white">{currentTrack.title}</div>
				<div class="text-sm opacity-75 text-white">{currentTrack.artist}</div>
			</div>

			<div class="progress-bar mb-2">
				<div class="bg-gray-700 rounded-full h-1.5 overflow-hidden">
					<div
						class="h-full rounded-full"
						style="width: 45%"
						class:bg-orange-500={currentPlatform === 'soundcloud'}
						class:bg-red-600={currentPlatform === 'youtube'}
					></div>
				</div>
				<div class="flex justify-between text-xs mt-1 text-white">
					<span>{currentTrack.currentTime}</span>
					<span>{currentTrack.duration}</span>
				</div>
			</div>

			<div class="controls flex justify-between">
				<button
					class="p-2 rounded-full text-white hover:bg-gray-700 transition"
					aria-label="Previous track"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-current">
						<path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
					</svg>
				</button>

				<button
					on:click={togglePlay}
					class="p-2 rounded-full text-white hover:bg-gray-700 transition"
					aria-label={isPlaying ? 'Pause' : 'Play'}
				>
					{#if isPlaying}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="w-6 h-6 fill-current"
						>
							<path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="w-6 h-6 fill-current"
						>
							<path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
						</svg>
					{/if}
				</button>
				<button
					class="p-2 rounded-full text-white hover:bg-gray-700 transition"
					aria-label="Next track"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-current">
						<path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
					</svg>
				</button>
			</div>
		</div>
	{/if}

	<div class="container mx-auto md:ml-auto md:w-1/2 w-full min-h-screen">
		<section class="min-h-screen flex items-center p-8">
			<div class="">
				<h2 class="text-4xl font-bold mb-4 text-orange-500">SoundCloud</h2>
				<p class="text-lg mb-4">穩定的播放你最喜歡的音樂</p>
				<ul class="space-y-2">
					<li class="flex items-center">
						<span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
						尋找最新的音樂
					</li>
				</ul>
			</div>
		</section>

		<section
			class="youtube-content min-h-screen flex items-center p-8"
			class:opacity-0={!isMobile}
			class:translate-y-8={!isMobile}
		>
			<div class="">
				<h2 class="text-4xl font-bold mb-4 text-red-600">YouTube</h2>
				<p class="text-lg mb-4">使用機器人播放你最喜歡的youtube音樂</p>
				<ul class="space-y-2">
					<li class="flex items-center">
						<span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
						支援播放清單
					</li>
					<li class="flex items-center">
						<span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
						自動推薦下一首歌曲
					</li>
				</ul>
			</div>
		</section>
	</div>
</div>

<style>
	.soundcloud-player {
		background-color: #ff7700;
		background-image: linear-gradient(45deg, #ff7700, #ff3300);
	}

	.youtube-player {
		background-color: #ff0000;
		background-image: linear-gradient(45deg, #ff0000, #cc0000);
	}
</style>
