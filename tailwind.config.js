/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#0a0a0a',
				'background-alt': '#171717',
				primary: '#415A77',
				secondary: '#778DA9',
				text: '#d1d5db',
				'text-subtle': '#9ca3af',
				hover: '#1f2937',
				'hover-text': '#f3f4f6',
				danger: '#f87171',
				'hover-danger-text': '#fca5a5',
				separator: '#374151',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontSize: {
				base: '1.125rem', // Default: 1rem (16px); Updated to 18px
				sm: '0.9375rem', // Default: 0.875rem (14px); Updated to 15px
				lg: '1.25rem', // Default: 1.125rem (18px); Updated to 20px
			},
		},
	},
};
