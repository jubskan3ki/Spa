<template>
	<div id="app">
		<DefaultLayout>
			<router-view />
		</DefaultLayout>
	</div>
</template>

<script setup lang="ts">
	import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
</script>

<style lang="scss">
	@use '@/styles/reset';
	@use '@/styles/main';
</style>
