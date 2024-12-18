<template>
	<div class="loader" :style="loaderStyles"></div>
</template>

<script setup lang="ts">
	import type { LoaderProps } from '@/types/components/common/Loader.type';

	const props = defineProps<LoaderProps>();

	const loaderStyles = {
		width: props.size || '40px',
		height: props.size || '40px',
		borderTopColor: props.color || 'vars.$primary-color',
	};
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
