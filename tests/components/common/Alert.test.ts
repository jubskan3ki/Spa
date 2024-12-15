import Alert from '@/components/common/Alert.vue';
import { render, fireEvent } from '@testing-library/vue';
import { vi } from 'vitest';
import { nextTick } from 'vue';

describe('Alert.vue', () => {
	it('renders the alert with correct message and type', () => {
		const { getByText, container } = render(Alert, {
			props: { message: 'Test message', type: 'success' },
		});

		expect(getByText('Test message')).toBeTruthy();
		expect(container.firstChild).toHaveClass('alert success');
	});

	it('emits close event when clicked', async () => {
		const { getByRole, emitted } = render(Alert, {
			props: { message: 'Test message', type: 'info' },
		});

		const alert = getByRole('alert');
		await fireEvent.click(alert);

		expect(emitted()).toHaveProperty('close');
	});

	it('hides alert automatically after 3 seconds', async () => {
		vi.useFakeTimers(); // Active les timers simulés
		const { emitted } = render(Alert, {
			props: { message: 'Auto hide' },
		});

		vi.advanceTimersByTime(3000); // Avance de 3 secondes
		await nextTick(); // Attend la résolution des tâches asynchrones

		expect(emitted()).toHaveProperty('close');
		vi.useRealTimers();
	});
});
