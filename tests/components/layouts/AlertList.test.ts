// tests/components/common/AlertList.test.ts
import AlertList from '@/components/layouts/AlertList.vue';
import { useAlertStore } from '@/stores/modules/alertStore';
import { render, screen, fireEvent } from '@testing-library/vue';
import { setActivePinia, createPinia } from 'pinia';

describe('AlertList.vue', () => {
	beforeEach(() => {
		// Initialise Pinia
		setActivePinia(createPinia());
	});

	it('renders the alerts correctly', async () => {
		const alertStore = useAlertStore();

		// Mock des alertes
		alertStore.alerts = [
			{ id: 1, type: 'success', message: 'Success alert' },
			{ id: 2, type: 'error', message: 'Error alert' },
		];

		render(AlertList);

		// Vérifie le rendu des messages
		expect(screen.getByText('Success alert')).toBeTruthy();
		expect(screen.getByText('Error alert')).toBeTruthy();
	});

	it('removes an alert when close event is emitted', async () => {
		const alertStore = useAlertStore();
		alertStore.alerts = [{ id: 1, type: 'info', message: 'Close me' }];

		render(AlertList);

		const alert = screen.getByText('Close me');
		await fireEvent.click(alert);

		// Vérifie que l'alerte a été supprimée
		expect(alertStore.alerts.length).toBe(0);
	});
});
