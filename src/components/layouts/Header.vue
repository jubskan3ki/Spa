<template>
	<header class="header">
		<img :src="IMAGES.LOGO" alt="Logo" class="logo" />
		<h1 class="title">THE <span>INTRANET</span></h1>
	</header>
</template>

<script setup lang="ts">
	import { IMAGES } from '@/config/images';
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;
	@use '@/styles/mixins' as mix;

	.header {
		@include mix.flexCenter;
		padding: vars.$spacing-md vars.$spacing-lg;

		.logo {
			height: 50px;
			margin-right: vars.$spacing-md;
		}

		.title {
			color: vars.$black;

			span {
				color: vars.$primary-color;
			}
		}
	}
</style>
