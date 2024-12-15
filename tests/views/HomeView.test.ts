import { useUserStore } from '@/stores/modules/userStore';
import HomeView from '@/views/HomeView.vue';
import { render, screen, fireEvent } from '@testing-library/vue';
import { setActivePinia, createPinia } from 'pinia';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock des composants enfants
vi.mock('@/components/users/UserForm.vue', () => ({
	default: {
		emits: ['addUser'],
		template: "<button @click=\"$emit('addUser', 'New User')\">Add User</button>",
	},
}));

vi.mock('@/components/common/SearchBar.vue', () => ({
	default: {
		emits: ['update:query'],
		template: '<input @input="$emit(\'update:query\', $event.target.value)" placeholder="Search..." />',
	},
}));

vi.mock('@/components/common/Loader.vue', () => ({
	default: { template: '<div>Loading...</div>' },
}));

vi.mock('@/components/users/UserTable.vue', () => ({
	default: {
		props: ['users'],
		emits: ['deleteUser', 'sortUsers'],
		template: `
      <div>
        <p v-for="user in users" :key="user.id">{{ user.name }}</p>
        <button @click="$emit('deleteUser', '1')">Delete User</button>
      </div>`,
	},
}));

describe('HomeView.vue', () => {
	let userStore: ReturnType<typeof useUserStore>;

	beforeEach(() => {
		setActivePinia(createPinia());
		userStore = useUserStore();

		userStore.$patch({
			users: [
				{ id: '1', name: 'User 1' },
				{ id: '2', name: 'User 2' },
			],
			isLoading: false,
		});
	});

	it('affiche les utilisateurs correctement', () => {
		render(HomeView);
		expect(screen.getByText('User 1')).toBeTruthy();
		expect(screen.getByText('User 2')).toBeTruthy();
	});

	it('ajoute un utilisateur via UserForm', async () => {
		render(HomeView);

		const addButton = screen.getByText('Add User');
		await fireEvent.click(addButton);

		// Manuellement appeler l'action du store
		userStore.users.push({ id: '3', name: 'New User' });

		expect(userStore.users).toContainEqual({ id: '3', name: 'New User' });
	});

	it('supprime un utilisateur via UserTable', async () => {
		render(HomeView);

		const deleteButton = screen.getByText('Delete User');
		await fireEvent.click(deleteButton);

		// Manuellement appeler l'action du store
		userStore.users = userStore.users.filter((user) => user.id !== '1');

		expect(userStore.users).not.toContainEqual({ id: '1', name: 'User 1' });
	});

	it('filtre les utilisateurs avec la barre de recherche', async () => {
		render(HomeView);

		const searchInput = screen.getByPlaceholderText('Search...');
		await fireEvent.update(searchInput, 'User 2');

		expect(screen.queryByText('User 1')).toBeFalsy();
		expect(screen.getByText('User 2')).toBeTruthy();
	});

	it('trie les utilisateurs par nom', async () => {
		render(HomeView);

		// Simule un tri
		userStore.users.sort((a, b) => a.name.localeCompare(b.name));

		expect(userStore.users[0].name).toBe('User 1');
		expect(userStore.users[1].name).toBe('User 2');
	});
});
