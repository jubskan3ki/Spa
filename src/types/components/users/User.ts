export interface User {
	id: string;
	name: string;
	avatar?: string;
	job?: string;
	email?: string;
	phone?: string;
	service?: string;
	createdAt?: string;
}

export interface SortOptions {
	key: string;
	direction: 'asc' | 'desc';
}
