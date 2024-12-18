export interface AlertProps {
	id: number;
	type: 'success' | 'error' | 'info';
	message: string;
}
