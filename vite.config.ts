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
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// React and React DOM
					react: ['react', 'react-dom'],

					// ProseMirror (TipTap)
					prosemirror: [
						'prosemirror-model',
						'prosemirror-state',
						'prosemirror-view',
						'prosemirror-transform',
						'prosemirror-history',
						'prosemirror-commands',
					],

					// Form Handling
					forms: ['react-hook-form'],

					// Framer Motion for Animations
					animations: ['framer-motion'],

					// State Management
					query: ['@tanstack/react-query'],

					// Validation
					validation: ['zod'],

					// UI Components
					ui: ['@radix-ui/react-dialog', '@radix-ui/react-menu', 'tippy.js'],

					// HTTP Client
					axios: ['axios'],

					// Utilities (e.g., Popper.js)
					utils: ['@floating-ui/dom', '@popperjs/core'],
				},
			},
		},
	},
});
