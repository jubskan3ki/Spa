<template>
	<div class="alert-list">
		<transition-group name="slide-fade" tag="div" class="alert-list-container">
			<Alert
				v-for="alert in alerts"
				:key="alert.id"
				:type="alert.type"
				:message="alert.message"
				@close="removeAlert(alert.id)"
			/>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useAlertStore } from '@/stores/modules/alertStore';
	import Alert from '@/components/common/Alert.vue';

	const alertStore = useAlertStore();
	const { alerts } = storeToRefs(alertStore);

	const removeAlert = (id: number) => {
		alertStore.removeAlert(id);
	};
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;

	.alert-list {
		position: fixed;
		bottom: vars.$spacing-lg;
		left: vars.$spacing-lg;
		display: flex;
		flex-direction: column;
		width: 300px;
		z-index: 1000;

		.alert-list-container {
			display: flex;
			flex-direction: column;
			gap: 10px; /* Espacement entre chaque alerte */
		}

		/* Animation pour les transitions */
		.slide-fade-enter-active,
		.slide-fade-leave-active {
			transition: all 0.5s ease;
		}

		.slide-fade-enter-from,
		.slide-fade-leave-to {
			opacity: 0;
			transform: translateY(10px); /* Effet de glissement */
		}
	}
</style>
