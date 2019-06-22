const Linter = require('./linter.js');
const esprima = require('../node_modules/esprima/dist/esprima.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const LinterError = require('./models/linter-error.js');
/* eslint-enable no-unused-vars */

const globalObj = typeof global === 'undefined' ? window : global;
globalObj['lint'] = function(jsonString) {
	let ast;
	try {
		ast = esprima.parseScript(`(${jsonString})`, {loc: true});
	} catch (error) {
		return [];
	}

	const linter = new Linter(ast);

	return linter
		.run()
		.map((error) => error.toObject());
};
