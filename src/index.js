const Linter = require('./linter.js');
const esprima = require('../node_modules/esprima/dist/esprima.js');

const globalObj = typeof global === 'undefined' ? window : global;
globalObj['lint'] = function() {
	return Linter.init(esprima);
};
