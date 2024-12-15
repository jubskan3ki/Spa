import Pagination from '@/components/common/Pagination.vue';
import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';

describe('Pagination.vue', () => {
	const defaultProps = {
		currentPage: 1,
		totalPages: 5,
		prevIcon: '/images/arrow-left.png',
		nextIcon: '/images/arrow-right.png',
	};

	it('affiche les boutons Précédent, Suivant et les pages', () => {
		render(Pagination, {
			props: defaultProps,
		});

		// Vérifie l'existence des boutons
		expect(screen.getByAltText('Précédent')).toBeTruthy();
		expect(screen.getByAltText('Suivant')).toBeTruthy();

		// Vérifie l'affichage des pages
		const pages = screen.getAllByText(/\d+/);
		expect(pages.length).toBeGreaterThanOrEqual(5);
		expect(screen.getByText('1')).toHaveClass('active');
	});

	it("désactive le bouton 'Précédent' sur la première page", () => {
		render(Pagination, {
			props: { ...defaultProps, currentPage: 1 },
		});

		const prevButton = screen.getByAltText('Précédent').closest('button');
		expect(prevButton).toBeDisabled();
	});

	it("désactive le bouton 'Suivant' sur la dernière page", () => {
		render(Pagination, {
			props: { ...defaultProps, currentPage: defaultProps.totalPages },
		});

		const nextButton = screen.getByAltText('Suivant').closest('button');
		expect(nextButton).toBeDisabled();
	});

	it("émet l'événement 'pageChange' lorsqu'une page est cliquée", async () => {
		const { emitted } = render(Pagination, {
			props: defaultProps,
		});

		const page2 = screen.getByText('2');
		await fireEvent.click(page2);

		expect(emitted()).toHaveProperty('pageChange');
		expect(emitted().pageChange[0]).toEqual([2]);
	});

	it("émet l'événement 'pageChange' lors d'un clic sur le bouton Suivant", async () => {
		const { emitted } = render(Pagination, {
			props: defaultProps,
		});

		const nextButton = screen.getByAltText('Suivant').closest('button')!;
		await fireEvent.click(nextButton);

		expect(emitted()).toHaveProperty('pageChange');
		expect(emitted().pageChange[0]).toEqual([2]);
	});

	it("émet l'événement 'pageChange' lors d'un clic sur le bouton Précédent", async () => {
		const { emitted } = render(Pagination, {
			props: { ...defaultProps, currentPage: 2 },
		});

		const prevButton = screen.getByAltText('Précédent').closest('button')!;
		await fireEvent.click(prevButton);

		expect(emitted()).toHaveProperty('pageChange');
		expect(emitted().pageChange[0]).toEqual([1]);
	});
});
