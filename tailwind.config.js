// @ts-check

const colors = require('tailwindcss/colors');

/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			neutral: colors.neutral,
			blue: colors.sky,
		},

		fontFamily: {
			sans: ['"Inter Tight"', 'sans-serif'],
		},

		fontWeight: {
			normal: 400,
			bold: 700,
		},
	},

	plugins: [],
};
