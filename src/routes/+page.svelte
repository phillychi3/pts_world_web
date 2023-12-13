<script>
	// @ts-nocheck

	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
    import Marquee from "svelte-fast-marquee";
	import Footer from "../components/Footer.svelte";
	import { CodeBlock } from '@skeletonlabs/skeleton';
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
<svelte:head>
	<title>pts world, 最好的娛樂機器人</title>
</svelte:head>

<AppBar slotDefault="place-self-start" slotTrail="place-content-end" class="top-0 sticky z-50">
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
		<a href="/">
			<i class="fa fa-github text-lg" aria-hidden="true"></i>
		</a>
	</svelte:fragment>
</AppBar>
<div class="max-h-full">
    <div class="mt-52">
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
				<div class="flex pt-10 justify-center">
					<a href="/" class="btn variant-filled ml-3 mr-3">邀請到Discord</a>
					<a href="/" class="btn variant-filled ml-3 mr-3">加入官方伺服器</a>
				</div>
            </div>
            <div>
                <img src="rtd.png" alt="pts" class="w-96 h-96 rounded-full">
            </div>
        </section>
        <section class="mt-6 mb-40">
                <div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex  overflow-x-clip px-4 py-10 ">
                    <Marquee>
                        {#each Array.from({ length: 10 }) as _, i}
                        <div class="snap-start shrink-0 card py-10 w-40 md:w-80 text-center">{i + 1}</div>
                        {/each}
                    </Marquee>
                </div>
        </section>
	</div>
	<div class="mt-6 mx-auto max-w-5xl">
		<section class="mt-6 mb-40">
			<div>
				<h1 class="h1 text-center">
					獨特的戰鬥系統
				</h1>

				<div class="flex flex-row justify-around mt-6">
					<div>
						<img src="https://image1.gamme.com.tw/news2/2015/62/45/p56ZoqOcj6SW.jpg" alt="pts" class="h-full">
					</div>
					<div>
						<h2 class="h2">再也不用看著自動戰鬥了</h2>
						<div class="text-xl">玩家可實際參與到戰鬥之中，不再只是數值遊戲了</div>
					</div>
				</div>


			</div>
		</section>
		<section class="mt-6 mb-40">
			<div>
				<h1 class="h1 text-center">
					多種玩法
				</h1>
				<div class="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-6">
					<div class="card card-hover">
						<div class="card-header">採集資源</div>
						<div class="p-4">採集資源可賣錢，交易或製作物品，並且在不同的地區可以採集到不同的資源</div>
					</div>
					<div class="card card-hover">
						<div class="card-header">農作</div>
						<div class="p-4">種植農作物，採集資源，飼養動物獲取生物資源</div>
					</div>
					<div class="card card-hover">
						<div class="card-header">戰鬥</div>
						<div class="p-4">升級經驗的最好手段，戰鬥獲取稀有資源，不只可與npc進行戰鬥，也可與玩家進行戰鬥</div>
					</div>
				</div>
			</div>
		</section>
		<section class="mt-6 mb-40">
			<div>
				<h1 class="h1 text-center">
					活躍伺服器
				</h1>
				<div class="flex lg:flex-row flex-col items-center justify-around">
					<div>
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABAlBMVEX///8AAABy2P9TU1Pr6+s0NDQRERGIiIg20o//XV3m5uaOjo4jIyMoKCi7u7sJCQl7e3t13v/Nzc3Y2OT09PRFRUVcXFwhgljc3NwOOSc42pStra2cnJx24P9z2//y8vLCwsKlpaUdcEwrqXMIIRYxv4JHR0eenp7W1tZYWFg6Ojpzc3O1tbUtLS1kZGR2dnYvWWlszfIZGRkMFxs3aXw5bH9Ji6RZqMZkvuAgPUgbMzxftNVSm7goTFoXKzMRICZiJCSBLy90Kio+FhahOzvRTEwaCQnpVVW2QkIrEBA6FRVQHR3ISUlCfZRNkqwSRS8MLh8baEcFFA3FxdDQ0Nvl5fHzfpUMAAAM4ElEQVR4nO2da0PbOBaGsZPCkhBCwGXYTchlZjaBAGmhpdDbdOj0Nu22e2n5/39lMYl0jq62bCmWdvN+gihO9MS2jvTqSF5bw9rt1bbakYdqn81GjbWySnpbVYPoNd4uBzj0nC9VrV4CcKPq2ufTsDDgSdVVz6vTgoDNqiueX7uFAIdVV9tESRHCVtW1NtGjAoAjdPzFuOahHmLEA3PCC3pwa3tQ4Bdagho9INwwPvqIHjt2UDdbOoDTYHwn9oofukzBiTC+TGvkyKKxZkmakXp2TY+k3bUyfaIl6JTUs2l65PriwDMX1bIoeicaNzWE8IGLallUfUWo1IrQFzkm3N3Y4TRkyg8mioL7wt6iaIMZGSRd/jObOqvCLeFOJGoGxcMxLthnjx1NUdkOvN6QuQqamOyUcCKpC/omfvyMMNYa3MBlREvkton6LLokTM6klYkWxTOhAPrvu3wRjbqKQekO/+VLIazLK7P4vSUGwRE58kh1kOq6iB5WQ6gwUe9PVUOJvia7Ei/I+e3KP/O4EkLJdQg/t6QRmpLjemIZbZ9kv0yka2qcEjakJ3F+LUoKaEyQlEH3XoIfRTV1JdxGi8a+UJfjOaB4Kmr0LhQbkxluKrsP+OK2btjguk+TJMmA2iV3/5DRMqU4HiRzwTFgM3cHfBn50CHUWyxfKmEqSohe2yavTcT307G1ZsaBhpPMUV/lhD3x/WPJ+3n9jxBq3IOACCVXKQ0yJ+rPtEfY2N09kpuhlghrzXudotZiRMqi1kazty09k3YIjzZIuzzris2VJUIKAwHhgCuaSaZVbBCeMp54tMH/lJYJoy0oHPNl4uVanrDxkP8W3m+0TYhig9jxPuPvlNKEkgrcXS3MpWqdENVAnFqecrdJWULFEIX5GuuEOG6IvT1udqwkoWKEwo7CrBMe4WPEYQlTXJKQb8vkv6RtQm6U3r3gylkbpxyh0HdHgubALuGF0LdJuvssJHMnliJkbsLfb27e/oH+Bx5LhM16I5V0eDCo1w9gpDy0RYjdlXcfN1O9/wIv0cG0u34pK4o4wq+WIXxEYT7M+VLd0Bep1bAsQhocGZYShKiZAcDNzbf0VdK7WhYhHevaIoQe06dNrD/Jy6RrU46Q1juT8CH/xSUJoY37wgBuviOvkz5iOUJaw/XmpJdqgqfZk9PeXJMmmFlM/7swYQJO5XuW8CN5ndyI5QiTSBAERMHx5o8uQQhW3dtNTuQyvbBCuCb27Gll5V4523EuSog++/MnjvDzomDdDqGsZ7gIivKUTnZ0UZSQ6Q1++ejyHMp6TouupzA8TMWZ2gUJ+ev/BjG+Jy+a34fH3G8zl3r2pSaWCAN0evRoLUMMoXhvvBPbUtL5zk9IZpm4vrVgbZNRvmTsJp4p8vWZmU6YUHZrfP7HgvADecU8Hibz2c513gc54uYXaa+en3fcGoofuvh9NHacSJjw45W55rfjDf2f1NMgU2GQDmhrkmna0xqEuzMYtiS4Pbioya3v7bM0mGZ/OSJUZqXf3Y40GsIsj1EuRuNAMQ1dPyDi3k+lTOxMNGUywiZEiie/cYgfPv1O/6Y/aHDZJj24Mp7FX1WnE4YW4RHC3f0i7nfOHysIoXMYHCHoqh/H/cOXz2WAKBkmXMLXnThVP34lmaNG7UW4hNf9eK5OfMmX4Z5FsIRfD2Oqw2v2dlzHR4ZK2D6PkfqdqxeokOn9hkr4rRMz6vef0jI27yhQwuexIAj/7DReoIQv+xxfB4L/jD0yTMLH3DUa98+hkOsEhkl4zp/CQ2hM+W58kIRfhVP4kpa1+CNDJHwjtDJ96LoJg7QQCV/xp7DzipaJyX8BEj7nb8L4/A0tFO2QDMK6RI5ZFBUBQiFSHEKkkKwx1RI2jiOJpkPHNDJBtvXTQw5QEylS6QhVGd66bENHQlXRRQpJ8pmWUJ7+fKf20ldjIutCiBRXtEx6IWoIE/VWEsXWxRcXmNy/CZEihlHFUHashlCVpF/BZQom95UQKb7RMnmmfxCEYHK/5gHjc6il3OoMgRDNUl4LzQw4GIrM0xAIweS+FCLFNS1TNX95CH/9eaF/VkKIljycx/wpfE3LVIu88xD+9W8L/VQJIXQ7eOsi7kCkmKoOz0f4l3tVQwjTdy/ESKGyLpD8J4QlmleCdfGMls2Ux3tPOKIQr/lmJkYdUvV4wHdCFClMrAsk3wkhP09nXWxpOsqeE0J+3hMhUvQhUui2LfE8WkBChxgpwLpQL65dyxnxf9JE/EavWUJD5hsHo2aP6VxCfp5oXcRgXbDJ4wUIRQGhdC2ogcZoVD6PfHgUCxO+Bia3XULpig4jQWo76Z0NJT/fY511oXeOShJKMvdMRd0x0sGmhuAA3qSLFBm5rSUJywNCj5m0KuvkwgXrQhcpsvYOKuliWCCkLT0BIntyQcqcaHLHGpM7P6HaiYJFExY2laR3ERnJkxQwSG7UmdyZm7AVchMhwMrX6psIZSXOkUjiHN37Knqusy4yc/70jrAsgzJ6gK8LuWmcWy08bk3SRRnHi4CI8vN01kX2RopZrn5DVI635FbCfxa9Zoub3GaElUlrckOHNDPz1l/CfCa30rpA8pSwjMnNyVPCfCa3Zi8UkJ+EyOTWWRe59jH3klBrckPuU74NJLwkhPWYl0IzAyb3Rb45Ph8JweRuC5Gik21yc/KRUGdy57QukDwkLGtyc/KQEJZSFTO5OflHCKuJhEiR37pA8o5Qa3JDpMhclkvlHWF5k5uTb4QWTG5OvhHCmLuUdYHkGaHW5H5CC002ZveMEOw9ncmdvVwRSU+YnHZFlX8ykVJWTG5OWkKwuxipd4otKZ110dHn56mlI5RvGRAVechEPoH7Wsbk5qQjlHqJ93LzqA/4RUuZ3Jx08xbyFcWphjaABIF1IUYKQ+sCyaOsL2RyC9ZFDN9t+ggPjwjh63Qmt1GkSOUPITK5NdaF1d09l0uY07pwQ/ivXxb6t0PCfCa3I8Jl5NPkNLkDJsyXnxcw4YgSaE3ucAlzmtwBE+YzuQMmxNYFfwqRdREwYT6T2ymh29xEZHLr8vMcErZ/Xeg/EsLRtFVW0HcSrQsmUjgjFAWE0j3LikprXVREWDb5kpUQKTpPhfcsm9Dqs6B11kVlhDYB34gmN1gX9GKx+mwE9V7LdJxt8xxqTW7a67FKqHzYM0y/WrwPxfy8GOXnOXq+hSoDGFkl9tpS3SL0E2dP8JhMtwS1dhgvcfRAfEtuncFZ0loXg2Cff6ibDmVN7lAJdSY3WBepyR0ooc7k7rP5eYESIusiy+QOkxDy87JN7jAJASJ7EXqQhGgRuiZSLNaXhEiIpkOvOtw57AuZ3CES4i2WL8+ZG1GyXUmIhEyXtv0Mn8Y+WBckPy9EQm5B0Ru4VA8l+XkhEgqPSnp8Pb9U+7JM7gAJE8no8/I8bVSRyQ2L0AMklC4ba3/r9JF1gTK5AyRUPC/3xcuOND8vQELFc6ujCADxmp8ACUekyjP89HVGeBF6gIS0z9a97a0LcKmYrIsACem8/fe9vR+PBLyIy89zRbg92xc1sbIfHb02f+zt7d1+FzPM2ExuR4SKdczCoyiLiHxYKyW8U5ezXtlHoTgiVJqhpqllElEPqra30G2TuR2H7PvdECobuXzL4rSiFs3slhCOcKYgv+bHCWFd3sRJfuAComl6O+Qc7jDfwOfnuSF0mfVFV8ZM5nw/WH9dWMEcHiFtxL7fX6Fd9ruGYmWCI6T3+D0hOwc0ldzm4RGST9pKgwU7VJRuk+CW0EEuBg0W09u972wklC8NdU1oPZ+G7sxSu2WjbkuR5BwcIR07nbBd0pmqRxgcITX02XtdvaowOEI2vC+0rlnaGxyhbFebmm45U3CEki6vvuqhEQ7ELJWMj3RM+PeFfpZVJ+8eQ7iVFIw2WTdmiYSigLAhWNcqbaHeNP9sT6MnPC6X0GivL3CwuYWNOfZCqozQbL82eikyPe2LPGu1KiM0AoQuJ/5h9nMZW5WN8c0I6dWICHNujuDGp1FvbFnPfotM9IeBqzTvDiVuCJWbk55kv0UmmIcg9R3n9iUd+aUKOxHfOQbpl1PUK9s1ra0rz/tAtknwkHlL7n2E2U5LMmo2Tda7BjhvYagVoVorQl+0IlRrReiLVoRqrQh90YpQrRWhL1oRqrUi9EUrQrX+fwgNt3lbug4KE9JJoGoe1ZxbdB5A84Q1uWjWo8Gep1WIpqPm3MUbRN3A1tKfYmwimKwy3ZAOHWqyr+uyBRvYFDgRMBvb2naz4WNpNZDtXGDbzREcHa2Pax6KmfM3vkjv1IoCUvajgSRSLu3wUcWaQ+X2F/6p6DPdLTxabDkqHrM3sj/cBw0LA97di1b3CnIjbVJYtpKJ54xjCxuo7fZqW6WfhOdC7bPZqOACj/8C9o5D3kE8uH8AAAAASUVORK5CYII=" alt="pts" class="h-full">
					</div>
					<div class="grid grid-cols-1 gap-4 mt-6">
						<div class="card card-hover">
							<div class="card-header">功能1</div>
							<div class="p-4">等待打字 - 等待打字 - 等待打字- 等待打字- 等待打字- 等待打字- 等待打字</div>
						</div>
						<div class="card card-hover">
							<div class="card-header">功能2</div>
							<div class="p-4">等待打字 - 等待打字 - 等待打字- 等待打字- 等待打字- 等待打字- 等待打字</div>
						</div>
						<div class="card card-hover">
							<div class="card-header">功能3</div>
							<div class="p-4">等待打字 - 等待打字 - 等待打字- 等待打字- 等待打字- 等待打字- 等待打字</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="mt-6 mb-40">
			<div>
				<h1 class="h1 text-center">
					構建屬於你的魔法
				</h1>
				<div class="flex lg:flex-row flex-col items-center justify-around">
					<div>
						<img src="data:image/png;base64,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" alt="pts" class="h-full">
					</div>
					<div class="grid grid-cols-1 gap-4 mt-6">
						<div class="card card-hover">
							<CodeBlock language="火球術" code={`魔力彈(載體:火,目標:敵方)`}></CodeBlock>
						</div>
						<div class="card card-hover">
							<CodeBlock language="滯留火球術(浮游砲)" code={`滯留法術(載體:魔力彈(載體:火,目標:敵方),滯留時間:2)`}></CodeBlock>
						</div>
						<div class="card card-hover">
							<CodeBlock language="帶有條件的魔法" code={`敵方血量高於(載體:魔力彈(載體:火,目標:敵方),血量:50)`}></CodeBlock>
						</div>
					</div>
				</div>
			</div>
		</section>
        <section class="mt-6 mb-40">
            <div>
                <h1 class="h1 text-center">
					眾多的種族可供選擇
                </h1>
				<div class="lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 grid mt-6 ">
					<div class="card card-hover variant-ghost-tertiary">
						<div class="card-header">百鬼神魔法</div>
						<div class="p-4">擅長精神魔法</div>
					</div>
					<div class="card card-hover variant-ghost-tertiary">
						<div class="card-header">血族</div>
						<div class="p-4">可使用吸血魔法</div>
					</div>
					<div class="card card-hover variant-ghost-tertiary">
						<div class="card-header">海生</div>
						<div class="p-4">可自由操控水元素</div>
					</div>
					<div class="card card-hover variant-ghost-tertiary">
						<div class="card-header">歌者</div>
						<div class="p-4">透過音樂對目標進行增益或傷害</div>
					</div>
					<div class="card card-hover variant-ghost-tertiary">
						<div class="card-header">精靈</div>
						<div class="p-4">可操控任何魔法</div>
					</div>
					<div class="card card-hover variant-ghost-tertiary">
						<div class="card-header">機械</div>
						<div class="p-4">可使用特殊技術複製魔法或裝置</div>
					</div>
					<div class="card card-hover variant-ghost-tertiary">
						<div class="card-header">龍族</div>
						<div class="p-4">掌握時間魔法</div>
					</div>
					<div class="card card-hover variant-ghost-tertiary">
						<div class="card-header">人類</div>
						<div class="p-4">他們可免費使用傳送裝置</div>
					</div>
				</div>
            </div>
        </section>
        <section class="mt-6 mb-40">
            <div>
                <h1 class="h1 text-center">
					全球經濟系統
                </h1>
            </div>
			<div class="flex justify-around mt-6 items-center">
				<div>
					<img src="https://image1.gamme.com.tw/news2/2015/62/45/p56ZoqOcj6SW.jpg" alt="pts" class="w-96 h-96">
				</div>
				<div>
					<h2 class="h2">全球經濟系統</h2>
					<div class="text-xl">進行冒險以獲取貨幣,在交易中心進行商品交易<br/>獲取道具,武器,藥水...</div>
				</div>
			</div>
        </section>
        <section class="mt-6 mb-40">
            <div>
                <h1 class="h1 text-center">
					想要更多?
                </h1>
            </div>
			<div class="flex justify-around mt-6 items-center">
				<h2 class="h2">更多功能等待您探索</h2>
				<div class="grid-cols-2 gap-4 grid mt-6">
					<div>11111</div>
					<div>11111</div>
					<div>11111</div>
					<div>11111</div>
				</div>
			</div>
        </section>
    </div>
</div>
<Footer/>