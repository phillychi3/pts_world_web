<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton'
	import { base } from '$app/paths'
</script>

<header class="sticky top-0 z-30 w-full bg-surface-100-800-token shadow-lg">
	<div class="max-w-[1300px] mx-auto px-4 py-3 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<h2 class="h2 font-bold text-2xl">Nothing Bot</h2>
			<div class="flex-row items-center space-y-0 space-x-4 text-sm hidden md:flex">
				<a href="{base}/docs" class="hover:text-primary-500 transition-colors duration-200">Docs</a>
				<a href="{base}/panel" class="hover:text-primary-500 transition-colors duration-200">Panel</a>
				<a href="{base}/ptsworld" class="hover:text-primary-500 transition-colors duration-200"
					>ptsworld</a
				>
			</div>
		</div>
		<div class="flex items-center space-x-4">
			<LightSwitch />
			<a
				target="_blank"
				href="https://github.com/phillychi3/pts_world_web"
				class="transition-colors duration-200"
			>
				<i class="fa fa-github text-2xl" aria-hidden="true"></i>
			</a>
		</div>
	</div>
</header>
