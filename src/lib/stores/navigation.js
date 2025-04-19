import { writable } from 'svelte/store'

export const isNavigating = writable(false)

// 用於導航前後設置載入狀態的輔助函數
export function startNavigation() {
	isNavigating.set(true)
}

export function endNavigation() {
	isNavigating.set(false)
}
