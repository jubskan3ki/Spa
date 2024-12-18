<template>
	<div class="layout">
		<!-- Header -->
		<Header />

		<!-- Contenu principal -->
		<main class="main">
			<slot></slot>
		</main>

		<!-- Footer -->
		<Footer />

		<!-- AlertList -->
		<AlertList />

		<!-- GlobalModal -->
		<GlobalModal />
	</div>
</template>

<script setup lang="ts">
	import Header from '@/components/layouts/Header.vue';
	import Footer from '@/components/layouts/Footer.vue';
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
