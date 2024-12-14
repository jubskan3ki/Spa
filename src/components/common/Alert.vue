<template>
	<div v-if="visible" :class="['alert', type]" role="alert" @click="hideAlert">
		<span class="alert-message">{{ message }}</span>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';

	defineProps({
		type: { type: String, default: 'info' },
		message: { type: String, required: true },
	});

	const emit = defineEmits(['close']);
	const visible = ref(true);

	// Permet de masquer l'alerte
	const hideAlert = () => {
		visible.value = false;
		emit('close');
	};

	// Auto hide after 3 seconds
	watch(visible, (val) => {
		if (val) {
			setTimeout(hideAlert, 3000);
		}
	});
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;

	.alert {
		padding: vars.$spacing-md;
		border-radius: 6px;
		color: white;
		font-weight: bold;
		text-align: center;
		cursor: pointer;

		&.success {
			background-color: vars.$success-color;
		}

		&.error {
			background-color: vars.$danger-color;
		}

		&.info {
			background-color: vars.$primary-color;
		}
	}
</style>
