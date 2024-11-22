import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), TanStackRouterVite()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});
