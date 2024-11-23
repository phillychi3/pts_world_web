<script>
	import { base } from '$app/paths'
</script>

<footer class="footer text-center py-2 bg-surface-100-800-token">
	<div
		class="flex lg:flex-row flex-col content pt-20 pb-20 mx-auto my-0 justify-between lg:w-4/5 w-full"
	>
		<div class="flex-col">
			<div>
				<!-- icon here -->
			</div>
			<div>Nothing Bot © 2021~2024</div>
		</div>
		<div class="flex lg:mt-0 mt-20 text-left sm:flex-row flex-col">
			<div class="ml-20">
				<ul>
					<a href={base}>
						<div class=" mb-4">首頁</div>
					</a>
					<div class=" mb-4">使用教學</div>
					<a href="https://github.com/phillychi3/pts_world_web" target="_blank">
						<div class=" mb-4">開源連結</div>
					</a>
				</ul>
			</div>
			<div class="ml-20">
				<a href="https://discord.gg/m6qKNZTaeR">
					<div class=" mb-4">支援伺服器</div>
				</a>
				<a href="https://discordservers.tw/bots/1044529058689593435">
					<div class=" mb-4">Discord TW</div>
				</a>
				<div class=" mb-4">Bots.gg</div>
				<a href="https://top.gg/bot/1044529058689593435">
					<div class=" mb-4">top.gg</div>
				</a>
			</div>
			<div class="ml-20">
				<a href="{base}/">
					<div class=" mb-4">隱私權政策</div>
				</a>
				<a href="{base}/">
					<div class=" mb-4">使用條款</div>
				</a>
				<div class=" mb-4">聯絡我們</div>
			</div>
		</div>
	</div>
</footer>
