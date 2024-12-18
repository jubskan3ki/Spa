<template>
	<button
		:type="type"
		:class="buttonClasses"
		:disabled="disabled"
		:aria-disabled="disabled"
		:aria-label="ariaLabel"
		@click="handleClick"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
	import type { BaseButtonProps } from '@/types/components/common/BaseButton.type';

	// Props avec valeurs par défaut
	const props = withDefaults(defineProps<BaseButtonProps>(), {
		variant: 'primary',
		className: '',
		outline: false,
		disabled: false,
		ariaLabel: 'Button',
	});

	const emit = defineEmits<{ (e: 'click', event: Event): void }>();

	// Classes dynamiques
	const buttonClasses = [
		'base-button',
		props.variant,
		props.className,
		{ outline: props.outline, disabled: props.disabled },
	];

	// Gestion du clic
	const handleClick = (event: Event) => {
		if (!props.disabled) emit('click', event);
	};
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;

	.base-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: vars.$spacing-sm vars.$spacing-md;
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
