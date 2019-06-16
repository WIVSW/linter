const Linter = require('./linter.js');
const esprima = require('../node_modules/esprima/dist/esprima.js');

const source = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "xl" }
            }
        },
        {
            "block": "input",
            "mods": { "size": "xxl" }
        }
    ]
}`;

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
