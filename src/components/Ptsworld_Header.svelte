<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	let popupSettings: PopupSettings = {
		event: 'focus-click', // 必須是 'focus-click' | 'click' | 'hover' | 'focus-blur' 其中之一
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let inputPopupDemo = '';

	let flavorOptions = [
		{
			keywords: 'nothing',
			label: 'nothing',
			value: 'nothing'
		}
	];

	interface AutocompleteEvent {
		detail: {
			label: string;
			value: string;
		};
	}

	function onPopupDemoSelect(event: AutocompleteEvent): void {
		inputPopupDemo = event.detail.label;
	}
</script>

<AppBar slotDefault="place-self-start" slotTrail="place-content-end" class="top-0 sticky z-50 ">
	<h2 class="h2">PTS World</h2>
	<svelte:fragment slot="trail">
		<div class="text-token w-full lg:max-w-[20%] max-w-[50%]">
			<input
				class="input autocomplete"
				type="search"
				name="autocomplete-search"
				bind:value={inputPopupDemo}
				placeholder="  Search..."
				use:popup={popupSettings}
			/>
		</div>
		<div
			data-popup="popupAutocomplete"
			class="card w-full lg:max-w-[20%] max-w-[50%] max-h-48 p-4 overflow-y-auto !m-0"
			tabindex="-1"
		>
			<Autocomplete
				bind:input={inputPopupDemo}
				options={flavorOptions}
				on:selection={onPopupDemoSelect}
			/>
		</div>
		<LightSwitch />
		<a target="_blank" href="https://github.com/phillychi3/pts_world_web">
			<i class="fa fa-github text-lg" aria-hidden="true"></i>
		</a>
	</svelte:fragment>
</AppBar>
