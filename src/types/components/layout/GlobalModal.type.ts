export interface ModalOptions {
	title: string;
	message: string;
	confirmLabel?: string;
	cancelLabel?: string;
	inputRequired?: boolean;
	onConfirm?: (value?: string) => void;
}

export interface ModalStoreState {
	isVisible: boolean;
	options: ModalOptions;
}
