const Linter = require('./linter.js');
const esprima = require('../node_modules/esprima/dist/esprima.js');

const globalObj = typeof global === 'undefined' ? window : global;
globalObj['lint'] = function(jsonString) {
	let ast;
	try {
		ast = esprima.parseScript(`(${jsonString})`, {loc: true});
	} catch (error) {
		return [error];
	}

	new Linter(ast);
};
