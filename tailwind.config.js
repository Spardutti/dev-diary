/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#0D1B2A',
				'background-alt': '#1B263B',
				primary: '#415A77',
				secondary: '#778DA9',
				text: '#E0E1DD',
				'text-dark': '#0D1B2A',
				'muted-teal': '#527A91',
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
