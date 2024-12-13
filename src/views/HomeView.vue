<template>
	<main class="home-view">
		<section class="user-form-container">
			<UserForm @addUser="addUser" />
		</section>

		<!-- Alertes globales -->
		<Alert v-if="alertMessage" :message="alertMessage" :type="alertType" @close="alertMessage = ''" />
		<Alert v-if="error" :message="error" type="error" @close="userStore.clearError()" />

		<!-- Barre de recherche -->
		<SearchBar @update:query="updateSearchQuery" />

		<!-- Loader pendant le chargement -->
		<section v-if="isLoading" class="loader-container">
			<Loader />
		</section>

		<!-- Tableau des utilisateurs -->
		<section v-if="filteredUsers.length" class="user-table-container">
			<UserTable :users="filteredUsers" @deleteUser="deleteUser" @sortUsers="sortUsers" />
		</section>
		<p v-else class="no-users">Aucun utilisateur trouvé.</p>
	</main>
</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useUserStore } from '@/stores/modules/userStore';

	import type { User } from '@/types/User';
	import UserForm from '@/components/users/UserForm.vue';
	import UserTable from '@/components/users/UserTable.vue';
	import SearchBar from '@/components/common/SearchBar.vue';
	import Loader from '@/components/common/Loader.vue';
	import Alert from '@/components/common/Alert.vue';

	const userStore = useUserStore();
	const { users, isLoading, error } = storeToRefs(userStore);
	const { fetchUsers, createUser, removeUser } = userStore;

	const alertMessage = ref('');
	const alertType = ref<'success' | 'error' | 'info'>('info');
	const searchQuery = ref('');
	const sortDirection = ref<'asc' | 'desc'>('asc');

	// Ajouter un utilisateur
	const addUser = (name: string) => {
		try {
			createUser(name);
			alertMessage.value = 'Utilisateur ajouté avec succès.';
			alertType.value = 'success';
		} catch (err) {
			alertMessage.value = 'Erreur lors de l’ajout de l’utilisateur.';
			alertType.value = 'error';
		}
	};

	// Supprimer un utilisateur
	const deleteUser = (id: string) => {
		try {
			removeUser(id);
			alertMessage.value = 'Utilisateur supprimé avec succès.';
			alertType.value = 'error';
		} catch (err) {
			alertMessage.value = 'Erreur lors de la suppression de l’utilisateur.';
			alertType.value = 'error';
		}
	};

	// Filtrer les utilisateurs
	const updateSearchQuery = (query: string) => {
		searchQuery.value = query;
	};

	const filteredUsers = computed(() => {
		return users.value.filter((user) => user.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
	});

	// Trier les utilisateurs
	const sortUsers = ({ key }: { key: keyof User }) => {
		sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
		users.value.sort((a, b) => {
			const valueA = a[key] ?? '';
			const valueB = b[key] ?? '';

			if (sortDirection.value === 'asc') return valueA > valueB ? 1 : -1;
			return valueA < valueB ? 1 : -1;
		});
	};

	onMounted(fetchUsers);
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;

	.home-view {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		.title {
			font-weight: 700;
			color: vars.$primary-color;
			margin-bottom: 2rem;
		}
	}
</style>
