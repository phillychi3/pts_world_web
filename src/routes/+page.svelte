<script>
	// @ts-nocheck

	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
    import Marquee from "svelte-fast-marquee";
	let popupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let inputPopupDemo = '';

	let flavorOptions = [
		{
			keywords: 'vanilla',
			label: 'Vanilla',
			value: 'vanilla'
		},
		{
			keywords: 'apple',
			label: 'apple',
			value: 'apple'
		},
		{
			keywords: 'banana',
			label: 'banana',
			value: 'banana'
		}
	];

	function onPopupDemoSelect(event) {
		inputPopupDemo = event.detail.label;
	}
</script>

<AppBar slotDefault="place-self-start" slotTrail="place-content-end">
	<h2 class="h2">PTS World</h2>
	<svelte:fragment slot="trail">
		<div class="text-token w-full max-w-[20%]">
			<input
				class="input autocomplete"
				type="search"
				name="autocomplete-search"
				bind:value={inputPopupDemo}
				placeholder="Search..."
				use:popup={popupSettings}
			/>
		</div>
		<div
			data-popup="popupAutocomplete"
			class="card w-full max-w-[20%] max-h-48 p-4 overflow-y-auto !m-0"
			tabindex="-1"
		>
			<Autocomplete
				bind:input={inputPopupDemo}
				options={flavorOptions}
				on:selection={onPopupDemoSelect}
			/>
		</div>
		<LightSwitch />
	</svelte:fragment>
</AppBar>
<div class="max-h-full">
    <div class="mt-60 mr-28 ml-28">
        <section class="flex justify-center items-center">
            <div>
                <h1 class="h1 text-left">
                    <span class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">
                    最好的娛樂機器人
                    </span>
                    <br>
                    <span class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">
                    PTS World
                    </span>
                </h1>
                <a href="/" class="btn variant-filled">邀請到Discord</a>
                <a href="/" class="btn variant-filled">加入官方伺服器</a>
            </div>
            <div>
                <img src="rtd.png" alt="pts" class="w-96 h-96">
            </div>
        </section>
        <section>

                <div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex  overflow-x-clip px-4 py-10 ">
                    <Marquee>
                        {#each Array.from({ length: 10 }) as _, i}
                        <div class="snap-start shrink-0 card py-10 w-40 md:w-80 text-center">{i + 1}</div>
                        {/each}
                    </Marquee>
                </div>
        </section>
        <section>
            <div>
                <h1 class="h1 text-left">
                    test
                    <br>
                    test
                    <br>
                    test
                    <br>
                    test
                    <br>
                    test
                    <br>
                    test
                    <br>
                    test
                    <br>
                    test
                    <br>
                </h1>
            </div>
        </section>

    </div>
</div>
