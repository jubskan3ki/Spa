import type { AlertProps } from '@/types/components/layout/AlertList.type';
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alertStore', {
	state: () => ({
		alerts: [] as AlertProps[],
	}),
	actions: {
		addAlert(type: AlertProps['type'], message: string) {
			const id = Date.now(); // ID unique basé sur le timestamp
			this.alerts.push({ id, type, message });
			// Retire automatiquement l'alert après 3 secondes
			setTimeout(() => this.removeAlert(id), 3000);
		},
		removeAlert(id: number) {
			this.alerts = this.alerts.filter((alert) => alert.id !== id);
		},
	},
});
