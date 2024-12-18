import UserForm from '@/components/users/UserForm.vue';
import { render, fireEvent, screen } from '@testing-library/vue';

describe('UserForm.vue', () => {
	it('affiche correctement le titre et les éléments du formulaire', () => {
		render(UserForm);

		expect(screen.getByText('Ajouter un utilisateur *')).toBeTruthy();
		expect(screen.getByPlaceholderText("Nom de l'utilisateur")).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Valider' })).toBeTruthy();
	});

	it("émet un événement addUser avec le nom de l'utilisateur", async () => {
		const { emitted } = render(UserForm);
		const input = screen.getByPlaceholderText("Nom de l'utilisateur");
		const button = screen.getByRole('button', { name: 'Valider' });

		await fireEvent.update(input, 'John Doe');
		await fireEvent.click(button);

		expect(emitted()).toHaveProperty('addUser');
		expect(emitted('addUser')[0]).toEqual(['John Doe']);
	});

	it("affiche un message d'erreur si le champ est vide", async () => {
		render(UserForm);
		const button = screen.getByRole('button', { name: 'Valider' });

		await fireEvent.click(button);

		expect(screen.getByText('Le champ nom est requis.')).toBeTruthy();
	});
});
