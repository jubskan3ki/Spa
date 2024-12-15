// tests/BaseButton.test.ts
import BaseButton from '@/components/common/BaseButton.vue';
import { render, fireEvent } from '@testing-library/vue';

describe('BaseButton.vue', () => {
	it('renders with default props', () => {
		const { getByRole } = render(BaseButton, {
			slots: { default: 'Click Me' },
		});

		const button = getByRole('button');
		expect(button).toHaveTextContent('Click Me');
		expect(button).toHaveClass('base-button primary');
	});

	it('applies correct props', () => {
		const { getByRole } = render(BaseButton, {
			props: { variant: 'outline', disabled: true },
			slots: { default: 'Disabled' },
		});

		const button = getByRole('button');
		expect(button).toHaveClass('outline disabled');
		expect(button).toBeDisabled();
	});

	it('emits click event', async () => {
		const { getByRole, emitted } = render(BaseButton);
		const button = getByRole('button');

		await fireEvent.click(button);
		expect(emitted()).toHaveProperty('click');
	});
});
