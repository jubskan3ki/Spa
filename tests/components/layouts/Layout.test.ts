import Layout from '@/components/layouts/DefaultLayout.vue';
import { render, screen } from '@testing-library/vue';

describe('Layout.vue', () => {
	it('renders the logo, header, and slot content', async () => {
		render(Layout, {
			slots: {
				default: '<div>Slot Content</div>',
			},
		});

		// Vérifie le logo
		expect(screen.getByAltText('Logo')).toBeTruthy();

		// Cible l'élément contenant "THE INTRANET" même si divisé
		const header = screen.getByRole('heading', {
			name: (_, element) => element?.textContent?.trim() === 'THE INTRANET',
		});
		expect(header).toBeTruthy();

		// Vérifie le contenu du slot
		expect(screen.getByText('Slot Content')).toBeTruthy();
	});

	it('renders the AlertList and GlobalModal components', () => {
		const { container } = render(Layout);

		expect(container.querySelector('.alert-list')).toBeTruthy();
		expect(container.querySelector('.modal-overlay')).toBeNull(); // Le modal est invisible par défaut
	});
});
