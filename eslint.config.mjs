import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: { vue, prettier: prettierPlugin },
		rules: {
			'prettier/prettier': 'error',
			'vue/html-self-closing': [
				'error',
				{
					html: { void: 'always', normal: 'never', component: 'always' },
					svg: 'always',
					math: 'always',
				},
			],
			'vue/component-api-style': ['error', ['script-setup', 'composition']],
			'vue/no-v-html': 'off',
		},
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				window: 'readonly',
				document: 'readonly',
				console: 'readonly',
				NodeJS: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			prettier: prettierPlugin,
			import: importPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
			'import/order': [
				'error',
				{
					groups: [['builtin', 'external', 'internal', 'parent', 'sibling', 'index']],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/extensions': [
				'error',
				'ignorePackages',
				{ js: 'never', ts: 'never', vue: 'always', scss: 'always' },
			],
			'import/no-unresolved': 'error',
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
				alias: {
					map: [['@', './src']],
					extensions: ['.ts', '.js', '.vue', '.json'],
				},
			},
		},
	},
];
