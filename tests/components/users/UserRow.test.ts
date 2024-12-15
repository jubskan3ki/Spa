import UserRow from '@/components/users/UserRow.vue';
import { render, screen, fireEvent } from '@testing-library/vue';
import { vi } from 'vitest';

// Mock pour useModalStore
vi.mock('@/stores/modules/modalStore', () => ({
	useModalStore: vi.fn(() => ({
		openModal: vi.fn(({ onConfirm }) => onConfirm()), // Simule le clic sur "Confirmer"
	})),
}));

describe('UserRow.vue', () => {
	const mockUser = {
		id: '1',
		name: 'John Doe',
		job: 'Développeur',
		email: 'john.doe@example.com',
		phone: '0123456789',
	};

	it('affiche correctement les données utilisateur', () => {
		render(UserRow, { props: { user: mockUser, index: 1 } });

		expect(screen.getByText('John Doe')).toBeTruthy();
		expect(screen.getByText('Développeur')).toBeTruthy();
		expect(screen.getByText('john.doe@example.com')).toBeTruthy();
		expect(screen.getByText('0123456789')).toBeTruthy();
	});

	it('émet un événement deleteUser lorsque le bouton est cliqué', async () => {
		const { emitted } = render(UserRow, { props: { user: mockUser, index: 1 } });

		const deleteButton = screen.getByRole('button', { name: 'Supprimer' });
		await fireEvent.click(deleteButton);

		// Vérifie que l'événement deleteUser est émis avec l'ID de l'utilisateur
		expect(emitted()).toHaveProperty('deleteUser');
		expect(emitted('deleteUser')[0]).toEqual([mockUser.id]);
	});
});
