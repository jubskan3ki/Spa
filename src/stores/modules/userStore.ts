import { getUsers, addUser, deleteUser } from '@/services/modules/userService';
import type { User } from '@/types/User';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
	state: () => ({
		users: [] as User[],
		isLoading: false,
		error: null as string | null,
	}),
	actions: {
		async fetchUsers() {
			this.isLoading = true;
			this.error = null;
			try {
				this.users = await getUsers();
			} catch (err) {
				this.error = 'Erreur lors de la récupération des utilisateurs.';
				console.error(err);
			} finally {
				this.isLoading = false;
			}
		},

		async createUser(name: string) {
			this.error = null;
			try {
				const newUser = await addUser(name);
				this.users.push(newUser);
			} catch (err) {
				this.error = 'Erreur lors de l’ajout de l’utilisateur.';
				console.error(err);
			}
		},

		async removeUser(id: string) {
			this.error = null;
			try {
				await deleteUser(id);
				this.users = this.users.filter((user) => user.id !== id);
			} catch (err) {
				this.error = 'Erreur lors de la suppression de l’utilisateur.';
				console.error(err);
			} finally {
				this.users = await getUsers();
			}
		},

		clearError() {
			this.error = null;
		},
	},
});
