const assert = require('assert');

try {
	require('../build/linter.js');
	global.bundleLint = global.lint;
} catch (error) {}
require('../src/index.js');
global.devLint = global.lint;

it('Lint function should be defined in global scope', () => {
	assert.strictEqual(typeof global.bundleLint, 'function');
	assert.strictEqual(typeof global.devLint, 'function');
});

// plug the tests
// if you need specific test just comment others
require('./collection');
