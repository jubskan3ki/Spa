<template>
	<div class="base-input">
		<label v-if="label" :for="id">{{ label }}</label>
		<div class="input-wrapper">
			<input
				:id="id"
				:type="type"
				:placeholder="placeholder"
				:value="modelValue"
				@input="handleInput"
				:class="{ error: hasError }"
				:aria-invalid="hasError"
			/>
			<span v-if="icon" class="icon">
				<img :src="icon" alt="Icon" />
			</span>
		</div>
		<small v-if="errorMessage" class="error-message">{{ errorMessage }}</small>
	</div>
</template>

<script setup lang="ts">
	import type { BaseInputProps } from '@/types/components/common/BaseInput.type';

	// Props avec valeurs par défaut
	withDefaults(defineProps<BaseInputProps>(), {
		id: () => `input-${crypto.randomUUID()}`, // Génère un id par défaut unique
		type: 'text',
		placeholder: '',
		label: '',
		errorMessage: '',
		hasError: false,
		icon: '',
		modelValue: '',
	});

	const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

	const handleInput = (event: Event) => {
		emit('update:modelValue', (event.target as HTMLInputElement).value);
	};
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;

	.base-input {
		display: flex;
		flex-direction: column;
		margin-bottom: vars.$spacing-md;

		label {
			margin-bottom: vars.$spacing-sm;
		}

		.input-wrapper {
			position: relative;

			input {
				&.error {
					border-color: vars.$danger-color;
				}
			}

			.icon {
				position: absolute;
				top: 50%;
				right: 10px;
				transform: translateY(-50%);

				img {
					width: 20px;
					height: 20px;
				}
			}
		}

		.error-message {
			margin-top: vars.$spacing-sm;
			color: vars.$danger-color;
		}
	}
</style>
