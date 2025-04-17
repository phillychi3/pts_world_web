<script>
	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props()
    console.log(data);
	const guild = $derived(data?.guild)

</script>


<div>
    {guild.toString()}
    {@render children()}
</div>
