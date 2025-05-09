const plugin = require('tailwindcss/plugin');
const radialGradientPlugin = require("./radialGradientPlugin");
import scrollBar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.{js,ts,vue}',
		'./index.html'
	],
	darkMode: 'media',
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1800px',
			'4xl': '1920px',
			'5xl': '2200px',
			tv: {
				min: '960px',
				max: '960px',
			},
		},
		extend: {
			width: {
				available: [
					'100%',
					'-webkit-fill-available',
					// 'stretch',
				],
			},
			minWidth: {
				available: [
					'100%',
					'-webkit-fill-available',
					// 'stretch',
				],
			},
			maxWidth: {
				available: [
					'100%',
					'-webkit-fill-available',
					// 'stretch',
				],
			},
			height: {
				available: [
					'100%',
					'-webkit-fill-available',
					'stretch',
				],
			},
			minHeight: {
				available: [
					'100%',
					'-webkit-fill-available',
					'stretch',
				],
			},
			maxHeight: {
				available: [
					'100%',
					'-webkit-fill-available',
					'stretch',
				],
			},
			fontSize: {
				'2xs': '0.625rem',
				'3xs': '0.5rem',
			},
		},
	},
	variants: {
		extend: {
			last: ['translate-x', 'translate-y'],
		},
	},
	plugins: [
		// require('@tailwindcss/forms'),
		require('tailwind-children'),
		scrollBar({nocompatible: true}),
		radialGradientPlugin,
		plugin(({ addVariant }) => {
			addVariant('range-track', [
				'&::-webkit-slider-runnable-track',
				'&::-moz-range-track',
				'&::-ms-track',
			]);
			addVariant('range-thumb', [
				'&::-webkit-slider-thumb',
				'&::-moz-range-thumb',
				'&::-ms-thumb',
			]);
		}),
	],
};
