import { API_BASE_URL } from '@/config/api';

export interface HttpClientOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	headers?: Record<string, string>;
	body?: any;
	params?: Record<string, string>;
}

const httpClient = async <T>(endpoint: string, options: HttpClientOptions = {}): Promise<T> => {
	const url = new URL(`${API_BASE_URL}${endpoint}`);

	// Ajout des paramètres (query string) si présents
	if (options.params) {
		Object.entries(options.params).forEach(([key, value]) => {
			url.searchParams.append(key, value);
		});
	}

	// Configuration des options par défaut
	const defaultHeaders = {
		'Content-Type': 'application/json',
	};

	const config: RequestInit = {
		method: options.method || 'GET',
		headers: { ...defaultHeaders, ...options.headers },
		body: options.body ? JSON.stringify(options.body) : undefined,
	};

	try {
		const response = await fetch(url.toString(), config);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
		}

		// Gestion des réponses sans contenu
		if (response.status === 204 || config.method === 'DELETE') {
			return undefined as T;
		}

		return (await response.json()) as T;
	} catch (error) {
		console.error(`HTTP Client Error on ${url.toString()}:`, error);
		throw error;
	}
};

export default httpClient;
