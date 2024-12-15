<template>
	<div class="alert-list">
		<transition-group tag="div" class="alert-list-container" name="alert">
			<Alert
				v-for="(alert, index) in alerts"
				:key="alert.id"
				:type="alert.type"
				:message="alert.message"
				@close="removeAlert(alert.id)"
				:style="getAnimationDelay(index)"
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

	const getAnimationDelay = (index: number) => ({
		animationDelay: `${index * 0.1}s`,
	});

	const removeAlert = (id: number) => {
		alertStore.removeAlert(id);
	};
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;
	@use '@/styles/mixins' as mix;

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
			gap: vars.$spacing-sm;

			/* Animation d'entrée */
			.alert-enter-active {
				@include mix.slide-in-bounce(0.6s);
			}

			.alert-enter-from {
				opacity: 0;
				transform: translateX(-30px);
			}

			.alert-enter-to {
				opacity: 1;
				transform: translateX(0);
			}

			/* Animation de sortie */
			.alert-leave-active {
				@include mix.slide-out-bounce(0.6s);
			}

			.alert-leave-from {
				opacity: 1;
				transform: translateX(0);
			}

			.alert-leave-to {
				opacity: 0;
				transform: translateX(30px);
			}
		}
	}
</style>
