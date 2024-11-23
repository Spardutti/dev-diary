/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#0D1B2A',
				'background-alt': '#1B263B',
				primary: '#415A77',
				secondary: '#778DA9',
				text: '#E0E1DD',
				"text-dark": '#0D1B2A',
				accent: '#FFB703',
				'muted-teal': '#527A91',
			},
		},
	},
	plugins: [],
};
