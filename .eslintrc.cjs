module.exports = {
	extends: ['alloy', 'alloy/react', 'alloy/typescript'],
	env: {
		// Your environments (which contains several predefined global variables)
		//
		// browser: true,
		// node: true,
		// mocha: true,
		// jest: true,
		// jquery: true
	},
	globals: {
		// Your global variables (setting to false means it's not allowed to be reassigned)
		//
		// myGlobal: false
	},
	rules: {
		// Customize your rules
		complexity: ['warn', 10],
		'react/jsx-max-depth': [
			'warn',
			{
				max: 4,
			},
		],
		'max-lines-per-function': [
			'warn',
			{
				max: 200,
			},
		],
		'react/function-component-definition': [
			'warn',
			{
				namedComponents: 'arrow-function',
			},
		],
		'max-params': ['warn', 3],
	},
};
