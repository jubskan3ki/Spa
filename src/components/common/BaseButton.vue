<template>
	<button
		:type="type"
		:class="['base-button', variant, className, { outline, disabled }]"
		:disabled="disabled"
		:aria-disabled="disabled"
		:aria-label="ariaLabel"
		@click="onClick"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
	import { PropType } from 'vue';

	// Props typées
	const props = defineProps({
		type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
		variant: { type: String, default: 'primary' },
		className: { type: String, default: '' },
		outline: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		ariaLabel: { type: String, default: 'Button' },
	});

	const emit = defineEmits(['click']);

	const onClick = (event: Event) => {
		if (!props.disabled) emit('click', event);
	};
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;
	@use 'sass:color';

	.base-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: vars.$spacing-sm vars.$spacing-md;
		font-weight: 500;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;

		&.primary {
			background-color: vars.$black;
			color: white;
		}

		&.outline {
			background-color: transparent;
			border: 2px solid currentColor;
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
