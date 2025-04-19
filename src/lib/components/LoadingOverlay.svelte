<script>
	import { isNavigating } from '$lib/stores/navigation'
</script>

{#if $isNavigating}
	<div class="loading-overlay">
		<div class="loading-content">
			<div class="loading-spinner"></div>
			<p class="loading-text">載入中...</p>
		</div>
	</div>
{/if}

<style>
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}

	.loading-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loading-spinner {
		width: 60px;
		height: 60px;
		border: 6px solid rgba(59, 130, 246, 0.3);
		border-radius: 50%;
		border-top-color: #3b82f6;
		animation: spin 1s linear infinite;
	}

	.loading-text {
		margin-top: 16px;
		font-size: 18px;
		color: #374151;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
