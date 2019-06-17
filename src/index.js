const Linter = require('./linter.js');
const esprima = require('../node_modules/esprima/dist/esprima.js');
const LinterError = require('./models/linter-error.js');

const globalObj = typeof global === 'undefined' ? window : global;
globalObj['lint'] = function(jsonString) {
	let ast;
	try {
		ast = esprima.parseScript(`(${jsonString})`, {loc: true});
	} catch (error) {
		return [LinterError.prototype.toObject.call(error)];
	}

	const linter = new Linter(ast);

	return linter
		.run()
		.map((error) => error.toObject());
};
