<script>
	import LoadingOverlay from '$lib/components/LoadingOverlay.svelte'

	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	const { data, children } = $props()

	const user = $derived(data?.user)
	const isAuthenticated = $derived(user?.discord?.authenticated || false)
</script>

<LoadingOverlay />

{#if isAuthenticated}
	<div class="min-h-screen flex flex-col">
		<div class="flex items-center p-4 bg-white sticky top-0 z-30 w-full shadow-sm">
			{#if user.discord.avatar}
				<img src={user.discord.avatar} alt="Discord Avatar" class="w-10 h-10 rounded-full" />
			{/if}
			<div class="user-info ml-3">
				<h3 class="font-medium">歡迎, {user.discord.username}</h3>
				<p class="text-sm text-gray-600">Discord ID: {user.discord.id}</p>
			</div>
		</div>
		<div class="flex-grow overflow-auto">
			{@render children()}
		</div>
	</div>
{:else}
	<div class="from-surface-900 to-surface-800 min-h-screen">
		<div class="mx-auto px-4 text-center py-32">
			<h1 class="text-2xl">登入</h1>
			<a
				href="/api/auth"
				class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>使用 Discord 登入</a
			>
		</div>
	</div>
{/if}
