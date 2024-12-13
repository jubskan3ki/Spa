import { API_ENDPOINTS } from '@/config/api';
import httpClient from '@/services/httpClient';
import type { User } from '@/types/User';

const ENDPOINT = API_ENDPOINTS.USERS;

export const getUsers = async (): Promise<User[]> => {
	return await httpClient<User[]>(ENDPOINT, { method: 'GET' });
};

export const addUser = async (name: string): Promise<User> => {
	return await httpClient<User>(ENDPOINT, { method: 'POST', body: { name } });
};

export const deleteUser = async (id: string): Promise<void> => {
	await httpClient<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' });
};
