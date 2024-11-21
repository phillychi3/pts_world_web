<script>

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	import Footer from '../../components/Ptsworld_Footer.svelte';
	import Header from '../../components/Ptsworld_Header.svelte';
</script>

<Header />
<slot />
<Footer />
