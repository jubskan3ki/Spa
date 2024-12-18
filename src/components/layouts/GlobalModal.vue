<template>
	<div v-if="isVisible" class="modal-overlay">
		<div :class="['modal-content', { 'fade-out': isFadingOut }]">
			<h2>{{ options.title }}</h2>
			<p>{{ options.message }}</p>

			<input v-if="options.inputRequired" v-model="inputValue" type="text" placeholder="Entrez une valeur" />

			<div class="modal-buttons">
				<button @click="confirm">{{ options.confirmLabel || 'Confirmer' }}</button>
				<button @click="close">{{ options.cancelLabel || 'Annuler' }}</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useModalStore } from '@/stores/modules/modalStore';
	import { ref } from 'vue';

	// Récupération du store
	const modalStore = useModalStore();
	const { isVisible, options } = storeToRefs(modalStore);

	// Données internes
	const inputValue = ref('');
	const isFadingOut = ref(false);

	// Confirmation de l'action
	const confirm = () => {
		options.value.onConfirm?.(options.value.inputRequired ? inputValue.value : undefined);
		close();
	};

	// Fermeture du modal avec animation
	const close = () => {
		isFadingOut.value = true;
		setTimeout(() => {
			isFadingOut.value = false;
			modalStore.closeModal();
		}, 500);
	};
</script>

<style scoped lang="scss">
	@use '@/styles/mixins' as mix;
	@use '@/styles/variables' as vars;

	/* Overlay */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(vars.$black, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	/* Contenu du modal */
	.modal-content {
		background: vars.$white;
		border-radius: vars.$spacing-xs;
		padding: vars.$spacing-lg;
		text-align: center;
		max-width: 500px;
		width: 90%;
		@include mix.box-shadow;

		@include mix.fade-in;

		&.fade-out {
			@include mix.fade-out;
		}

		@include mix.responsive(vars.$breakpoint-tablet) {
			padding: vars.$spacing-md;
		}

		@include mix.responsive(vars.$breakpoint-mobile) {
			width: 95%;
		}

		h2 {
			color: vars.$primary-color;
			margin-bottom: vars.$spacing-md;
		}

		p {
			color: vars.$gray-dark;
			margin-bottom: vars.$spacing-md;
		}

		input {
			width: 100%;
			padding: vars.$spacing-sm;
			border: 1px solid vars.$gray-light;
			border-radius: vars.$spacing-xs;
			margin-bottom: vars.$spacing-md;
			transition: border-color 0.3s ease;

			&:focus {
				border-color: vars.$primary-color;
				outline: none;
			}
		}

		.modal-buttons {
			display: flex;
			justify-content: center;
			gap: vars.$spacing-md;

			button {
				padding: vars.$spacing-sm vars.$spacing-lg;
				border: none;
				border-radius: vars.$spacing-xs;
				cursor: pointer;
				font-family: vars.$font-family;
				@include mix.box-shadow;
				transition:
					background-color 0.3s ease,
					transform 0.2s ease;

				&:first-child {
					background-color: vars.$success-color;
					color: vars.$white;

					&:hover {
						@include mix.hover-adjust-bg(vars.$success-color, -10%);
					}
				}

				&:last-child {
					background-color: vars.$danger-color;
					color: vars.$white;

					&:hover {
						@include mix.hover-adjust-bg(vars.$danger-color, -10%);
					}
				}
			}
		}
	}
</style>
