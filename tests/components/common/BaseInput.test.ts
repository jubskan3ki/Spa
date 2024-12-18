import BaseInput from '@/components/common/BaseInput.vue';
import { render, fireEvent } from '@testing-library/vue';

describe('BaseInput.vue', () => {
	it('renders with placeholder and label', () => {
		const { getByLabelText, getByPlaceholderText } = render(BaseInput, {
			props: { label: 'Username', placeholder: 'Enter your username', modelValue: '' },
		});

		expect(getByLabelText('Username')).toBeTruthy();
		expect(getByPlaceholderText('Enter your username')).toBeTruthy();
	});

	it('emits update:modelValue on input', async () => {
		const { getByPlaceholderText, emitted } = render(BaseInput, {
			props: { placeholder: 'Input', modelValue: '' },
		});

		const input = getByPlaceholderText('Input');
		await fireEvent.update(input, 'New Value');

		expect(emitted()['update:modelValue'][0]).toEqual(['New Value']);
	});

	it('shows error message when provided', () => {
		const { getByText } = render(BaseInput, {
			props: { errorMessage: 'Field is required', hasError: true, modelValue: '' },
		});

		expect(getByText('Field is required')).toBeTruthy();
	});
});
