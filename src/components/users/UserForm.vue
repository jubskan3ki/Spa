<template>
	<form @submit.prevent="submitForm" class="user-form">
		<h2 class="title">Ajouter un utilisateur *</h2>
		<BaseInput
			id="user-name"
			v-model="userName"
			placeholder="Nom de l'utilisateur"
			:hasError="!!errorMessage"
			:aria-invalid="!!errorMessage"
		/>
		<BaseButton className="button-from" type="submit" variant="primary">Valider</BaseButton>
		<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
		<small class="info">*Seul le champ nom est nécessaire. le reste étant peuplé automatiquement par l'API</small>
	</form>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import BaseInput from '@/components/common/BaseInput.vue';
	import BaseButton from '@/components/common/BaseButton.vue';

	const emit = defineEmits(['addUser']);
	const userName = ref('');
	const errorMessage = ref('');

	const ERROR_MESSAGES = {
		required: 'Le champ nom est requis.',
	};

	const submitForm = () => {
		if (userName.value.trim()) {
			emit('addUser', userName.value);
			userName.value = '';
			errorMessage.value = '';
		} else {
			errorMessage.value = ERROR_MESSAGES.required;
		}
	};
</script>

<style scoped lang="scss">
	@use '@/styles/variables' as vars;

	.user-form {
		display: flex;
		max-width: 1024px;
		gap: vars.$spacing-sm;
		flex-direction: column;
		padding: vars.$spacing-md;
		border-radius: 4px;
		background-color: vars.$white-dark;
		border: 2px dashed vars.$gray-light;

		.error {
			color: vars.$danger-color;
		}

		.info {
			color: #666;
		}

		.button-from {
			align-self: flex-end;
		}
	}
</style>
