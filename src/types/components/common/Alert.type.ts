export interface AlertProps {
	type?: 'success' | 'error' | 'info';
	message: string;
}

export interface AlertEmits {
	(e: 'close'): void;
}
