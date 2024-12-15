import '@testing-library/jest-dom';
import { setActivePinia, createPinia } from 'pinia';
import { vi } from 'vitest';

// Mock global pour ResizeObserver avec types de retour
globalThis.ResizeObserver = class ResizeObserver {
	observe(): void {}
	unobserve(): void {}
	disconnect(): void {}
};

// Mock du router pour Vitest avec types de retour
vi.mock('vue-router', () => ({
	useRouter: (): { push: () => void } => ({
		push: vi.fn(),
	}),
	useRoute: (): { params: Record<string, unknown> } => ({
		params: {},
	}),
}));

beforeEach(() => {
	setActivePinia(createPinia());
});
