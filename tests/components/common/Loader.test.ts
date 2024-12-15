// tests/Loader.test.ts
import Loader from '@/components/common/Loader.vue';
import { render } from '@testing-library/vue';

describe('Loader.vue', () => {
	it('renders with default size and color', () => {
		const { container } = render(Loader);

		const loader = container.firstChild as HTMLElement;
		expect(loader.style.width).toBe('40px');
		expect(loader.style.height).toBe('40px');
	});

	it('applies custom size and color', () => {
		const { container } = render(Loader, {
			props: { size: '60px', color: 'red' },
		});

		const loader = container.firstChild as HTMLElement;
		expect(loader.style.width).toBe('60px');
		expect(loader.style.height).toBe('60px');
		expect(loader.style.borderTopColor).toBe('red');
	});
});
