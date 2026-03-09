import antfu from '@antfu/eslint-config';

export default antfu({
	ignores: ['wiki/**', 'public/js/**', 'README.md'],
	vue: {
		a11y: true,
		overrides: {
			'prefer-regex-literals': 'off',
			'regexp/prefer-w': 'off',
			'vue-a11y/no-distracting-elements': 'off',
			'vue/first-attribute-linebreak': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/no-deprecated-slot-attribute': 'off',
			'vue/no-reserved-component-names': 'off',
			'vue-a11y/tabindex-no-positive': 'off',
			'vue-a11y/no-static-element-interactions': 'off',
			'vue-a11y/click-events-have-key-events': 'off',
		},
	},
	typescript: {
		overrides: {
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'antfu/top-level-function': 'off',
			'no-async-promise-executor': 'off',
			'no-console': 'off',
			'no-extend-native': 'off',
			'node/prefer-global/process': 'off',
			'perfectionist/sort-imports': 'off',
			'ts/no-unsafe-function-type': 'off',
			'ts/method-signature-style': 'off',
			'unused-imports/no-unused-vars': 'warn',
		},
	},
	js: {
		overrides: {
			'no-console': 'off',
			'no-debugger': 'off',
		},
	},
	test: {
		overrides: {
			'test/prefer-lowercase-title': 'off',
		},
	},
	stylistic: {
		indent: 'tab',
		quotes: 'single',
		semi: true,
	},
	formatters: {
		css: true,
		html: true,
		markdown: true,
		svg: false,
	},
}, {
	files: ['e2e/**/*.ts'],
	rules: {
		'style/max-statements-per-line': 'off',
	},
});
