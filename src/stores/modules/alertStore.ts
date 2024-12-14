import { defineStore } from 'pinia';

interface Alert {
	id: number;
	type: 'success' | 'error' | 'info';
	message: string;
}

export const useAlertStore = defineStore('alertStore', {
	state: () => ({
		alerts: [] as Alert[],
	}),
	actions: {
		addAlert(type: Alert['type'], message: string) {
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
