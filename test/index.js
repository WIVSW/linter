const assert = require('assert');

require('../src/index.js');


it('Lint function should be defined in global scope', () => {
	assert.strictEqual(typeof global.lint, 'function');
});

// plug the tests
// if you need specific test just comment others
require('./collection');
