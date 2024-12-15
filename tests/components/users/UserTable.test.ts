import UserTable from '@/components/users/UserTable.vue';
import { useUserStore } from '@/stores/modules/userStore';
import { render, screen, fireEvent } from '@testing-library/vue';
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock des composants enfants
vi.mock('@/components/users/UserRow.vue', () => ({
	default: {
		props: ['user', 'index'],
		emits: ['deleteUser'],
		template: `<tr>
      <td>{{ user.name }}</td>
      <td><button @click="$emit('deleteUser', user.id)">Supprimer</button></td>
    </tr>`,
	},
}));

vi.mock('@/components/common/Pagination.vue', () => ({
	default: {
		props: ['currentPage', 'totalPages', 'prevIcon', 'nextIcon'],
		emits: ['pageChange'],
		template: `
      <div>
        <button @click="$emit('pageChange', currentPage - 1)" :disabled="currentPage === 1">Précédent</button>
        <button @click="$emit('pageChange', currentPage + 1)" :disabled="currentPage === totalPages">Suivant</button>
      </div>
    `,
	},
}));

describe('UserTable.vue', () => {
	let userStore: ReturnType<typeof useUserStore>;

	beforeEach(() => {
		setActivePinia(createPinia());
		userStore = useUserStore();

		// Mock manuel pour `setPage`
		userStore.setPage = vi.fn();

		// Initialisation des données
		userStore.$patch({
			users: [
				{ id: '1', name: 'John Doe', job: 'Dev', email: 'john@example.com', phone: '123456789' },
				{ id: '2', name: 'Jane Doe', job: 'Designer', email: 'jane@example.com', phone: '987654321' },
				{ id: '3', name: 'Alice', job: 'Manager', email: 'alice@example.com', phone: '456789123' },
				{ id: '4', name: 'Bob', job: 'QA', email: 'bob@example.com', phone: '321654987' },
			],
			currentPage: 1,
			pageSize: 2,
		});
	});

	it('affiche les utilisateurs paginés', () => {
		render(UserTable);

		expect(screen.getByText('John Doe')).toBeTruthy();
		expect(screen.getByText('Jane Doe')).toBeTruthy();
		expect(screen.queryByText('Alice')).toBeFalsy(); // Alice ne doit pas apparaître sur la première page
	});

	it('navigue à la page suivante via la pagination', async () => {
		render(UserTable);

		const nextButton = screen.getByText('Suivant');
		expect(nextButton).toBeEnabled();

		await fireEvent.click(nextButton);

		expect(userStore.setPage).toHaveBeenCalledWith(2); // Vérifie que `setPage` a été appelée avec 2
	});

	it('navigue à la page précédente via la pagination', async () => {
		userStore.$patch({ currentPage: 2 });
		render(UserTable);

		const prevButton = screen.getByText('Précédent');
		expect(prevButton).toBeEnabled();

		await fireEvent.click(prevButton);

		expect(userStore.setPage).toHaveBeenCalledWith(1); // Vérifie que `setPage` a été appelée avec 1
	});

	it("émet l'événement 'deleteUser' lorsqu'un utilisateur est supprimé", async () => {
		const { emitted } = render(UserTable);

		const deleteButton = screen.getAllByText('Supprimer')[0];
		await fireEvent.click(deleteButton);

		expect(emitted()).toHaveProperty('deleteUser');
		expect(emitted().deleteUser[0]).toEqual(['1']);
	});

	it("émet l'événement 'sortUsers' lorsqu'on clique sur le tri", async () => {
		const { emitted } = render(UserTable);

		const sortButton = screen.getByText('NOM');
		await fireEvent.click(sortButton);

		const emittedEvents = emitted() as Record<string, unknown[][]>;
		expect(emittedEvents).toHaveProperty('sortUsers');
		expect(emittedEvents.sortUsers[0][0]).toMatchObject({ key: 'name', direction: 'desc' });
	});
});
