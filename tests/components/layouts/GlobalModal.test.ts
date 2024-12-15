import GlobalModal from '@/components/layouts/GlobalModal.vue';
import { useModalStore } from '@/stores/modules/modalStore';
import { render, screen, fireEvent } from '@testing-library/vue';
import { setActivePinia, createPinia } from 'pinia';
import { vi } from 'vitest';

describe('GlobalModal.vue', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		vi.useFakeTimers(); // Active les timers simulés
	});

	afterEach(() => {
		vi.useRealTimers(); // Restaure les timers réels
	});

	it('renders modal content when visible', async () => {
		const modalStore = useModalStore();
		modalStore.isVisible = true;
		modalStore.options = { title: 'Test Modal', message: 'This is a test' };

		render(GlobalModal);

		expect(screen.getByText('Test Modal')).toBeTruthy();
		expect(screen.getByText('This is a test')).toBeTruthy();
	});

	it('calls onConfirm when confirm button is clicked', async () => {
		const modalStore = useModalStore();
		const onConfirm = vi.fn();

		modalStore.isVisible = true;
		modalStore.options = {
			title: 'Confirm Modal',
			message: 'Please confirm',
			onConfirm,
		};

		render(GlobalModal);

		const confirmButton = screen.getByText('Confirmer');
		await fireEvent.click(confirmButton);

		expect(onConfirm).toHaveBeenCalled();
	});

	it('closes the modal when close button is clicked', async () => {
		const modalStore = useModalStore();
		modalStore.isVisible = true;
		modalStore.options = {
			title: 'Close Modal',
			message: 'You can close this modal',
		};

		render(GlobalModal);

		const cancelButton = screen.getByText('Annuler');
		await fireEvent.click(cancelButton);

		// Avancer le temps pour permettre au `setTimeout` de s'exécuter
		vi.advanceTimersByTime(500);

		expect(modalStore.isVisible).toBe(false);
	});
});
