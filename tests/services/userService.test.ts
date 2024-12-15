import httpClient from '@/services/httpClient';
import { getUsers, addUser, deleteUser } from '@/services/modules/userService';
import { vi, describe, it, expect } from 'vitest';

// Mock du client HTTP
vi.mock('@/services/httpClient');

describe('User Service', () => {
	it('getUsers appelle le client HTTP et retourne les utilisateurs', async () => {
		const mockUsers = [
			{ id: '1', name: 'User 1' },
			{ id: '2', name: 'User 2' },
		];
		vi.mocked(httpClient).mockResolvedValue(mockUsers);

		const result = await getUsers();

		// Correction de l'endpoint attendu
		expect(httpClient).toHaveBeenCalledWith('/users', { method: 'GET' });
		expect(result).toEqual(mockUsers);
	});

	it('addUser appelle le client HTTP avec les bonnes données et retourne le nouvel utilisateur', async () => {
		const newUser = { id: '3', name: 'New User' };
		vi.mocked(httpClient).mockResolvedValue(newUser);

		const result = await addUser('New User');

		// Correction de l'endpoint attendu
		expect(httpClient).toHaveBeenCalledWith('/users', { method: 'POST', body: { name: 'New User' } });
		expect(result).toEqual(newUser);
	});

	it("deleteUser appelle le client HTTP avec l'ID de l'utilisateur", async () => {
		vi.mocked(httpClient).mockResolvedValue(undefined);

		await deleteUser('1');

		// Correction de l'endpoint attendu
		expect(httpClient).toHaveBeenCalledWith('/users/1', { method: 'DELETE' });
	});
});
