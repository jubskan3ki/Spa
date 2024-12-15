// tests/SearchBar.test.ts
import SearchBar from '@/components/common/SearchBar.vue';
import { render, fireEvent } from '@testing-library/vue';

describe('SearchBar.vue', () => {
	it('updates search query and emits update:query', async () => {
		const { getByPlaceholderText, emitted } = render(SearchBar);

		const input = getByPlaceholderText('Rechercher un utilisateur...');
		await fireEvent.update(input, 'John Doe');

		expect(input).toHaveValue('John Doe');
		expect(emitted()['update:query'][0]).toEqual(['John Doe']);
	});
});
