<template>
	<div
		class="loader"
		:style="{
			width: size,
			height: size,
			borderTopColor: color,
		}"
	></div>
</template>

<script setup lang="ts">
	defineProps({
		size: { type: String, default: '40px' },
		color: { type: String, default: 'vars.$primary-color' },
	});
</script>

<style lang="scss" scoped>
	.loader {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		animation: spin 1s linear infinite;

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
</style>
