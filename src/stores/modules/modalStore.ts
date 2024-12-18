import type { ModalOptions } from '@/types/components/layout/GlobalModal.type';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
	state: () => ({
		isVisible: false,
		options: {
			title: '',
			message: '',
			confirmLabel: 'Confirmer',
			cancelLabel: 'Annuler',
			inputRequired: false,
			onConfirm: undefined,
		} as ModalOptions,
	}),
	actions: {
		openModal(options: ModalOptions) {
			this.options = { ...this.options, ...options };
			this.isVisible = true;
		},
		closeModal() {
			this.isVisible = false;
			this.options = {
				title: '',
				message: '',
				confirmLabel: 'Confirmer',
				cancelLabel: 'Annuler',
				inputRequired: false,
				onConfirm: undefined,
			};
		},
		confirmAction(inputValue?: string) {
			if (this.options.onConfirm) this.options.onConfirm(inputValue);
			this.closeModal();
		},
	},
});
