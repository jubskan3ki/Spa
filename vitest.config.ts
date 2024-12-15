import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './tests/setup.ts',
		include: ['**/*.test.ts', '**/*.spec.ts'],
		coverage: {
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,vue}'],
		},
	},
});
