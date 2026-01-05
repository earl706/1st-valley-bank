import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.js',
		coverage: {
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'src/test/',
				'dist/',
				'*.config.js',
				'**/*.config.js',
				'src/main.jsx',
				'src/**/*.test.{js,jsx}',
				'src/**/*.examples.jsx',
				'src/**/*.backup*',
				'src/assets/**'
			],
			thresholds: {
				statements: 60,
				branches: 70,
				functions: 60,
				lines: 60
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
});
