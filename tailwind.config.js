/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'rgb(var(--primary))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#4ade80',
					foreground: '#000000',
				},
				secondary: {
					DEFAULT: '#1e293b',
					foreground: '#ffffff',
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#ffffff',
				},
				muted: {
					DEFAULT: '#334155',
					foreground: '#94a3b8',
				},
				accent: {
					DEFAULT: '#1e293b',
					foreground: '#ffffff',
				},
				popover: {
					DEFAULT: '#020617',
					foreground: '#ffffff',
				},
				card: {
					DEFAULT: '#020617',
					foreground: '#ffffff',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				mono: ['var(--font-space-mono)', 'monospace'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	// plugins: [require('tailwindcss-animate')],
};
