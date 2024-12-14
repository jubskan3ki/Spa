<template>
	<div class="layout">
		<!-- Header -->
		<header class="header">
			<img :src="IMAGES.LOGO" alt="Logo" class="logo" />
			<h1 class="title">THE <span>INTRANET</span></h1>
		</header>

		<!-- Contenu principal -->
		<main class="main">
			<slot></slot>
		</main>

		<!-- Footer -->
		<footer class="footer"></footer>

		<!-- AlertList -->
		<AlertList />

		<!-- GlobalModal -->
		<GlobalModal />
	</div>
</template>

<script setup lang="ts">
	import { IMAGES } from '@/config/images';
	import AlertList from '@/components/layouts/AlertList.vue';
	import GlobalModal from '@/components/layouts/GlobalModal.vue';
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;
	@use '@/styles/mixins' as mix;

	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: vars.$white;

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

		.main {
			flex: 1;
			padding: vars.$spacing-xl;
			background-color: vars.$white;

			@include mix.responsive(vars.$breakpoint-tablet) {
				padding: vars.$spacing-lg;
			}

			@include mix.responsive(vars.$breakpoint-mobile) {
				padding: vars.$spacing-md;
			}
		}

		.footer {
			background: vars.$primary-color;
			padding: vars.$spacing-sm;
		}
	}
</style>
