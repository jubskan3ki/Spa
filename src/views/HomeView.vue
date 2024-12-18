<template>
	<main class="home-view">
		<section class="user-form-container">
			<UserForm @addUser="addUser" />
		</section>

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
	import { useAlertStore } from '@/stores/modules/alertStore';

	import type { User, SortOptions } from '@/types/components/users/User';
	import UserForm from '@/components/users/UserForm.vue';
	import UserTable from '@/components/users/UserTable.vue';
	import SearchBar from '@/components/common/SearchBar.vue';
	import Loader from '@/components/common/Loader.vue';

	// Stores
	const userStore = useUserStore();
	const alertStore = useAlertStore();

	const { users, isLoading } = storeToRefs(userStore);
	const { fetchUsers, createUser, removeUser } = userStore;

	const searchQuery = ref('');
	const sortDirection = ref<'asc' | 'desc'>('asc');

	// Ajouter un utilisateur
	const addUser = async (name: string) => {
		try {
			await createUser(name);
			alertStore.addAlert('success', 'Utilisateur ajouté avec succès.');
		} catch (err) {
			alertStore.addAlert('error', 'Erreur lors de l’ajout de l’utilisateur.');
		}
	};

	// Supprimer un utilisateur
	const deleteUser = async (id: string) => {
		try {
			await removeUser(id);
			alertStore.addAlert('info', 'Utilisateur supprimé avec succès.');
		} catch (err) {
			alertStore.addAlert('error', 'Erreur lors de la suppression de l’utilisateur.');
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
	const sortUsers = ({ key, direction }: SortOptions) => {
		sortDirection.value = direction;
		users.value.sort((a, b) => {
			const valueA = a[key as keyof User] ?? '';
			const valueB = b[key as keyof User] ?? '';

			if (direction === 'asc') return valueA > valueB ? 1 : -1;
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
