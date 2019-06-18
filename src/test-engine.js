const InputLabelSize = require('./tests/form/input-label-sizes.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const LinterError = require('./models/linter-error.js');
const BlockCollection = require('./collections/block.js');
const Test = require('./tests/test.js');
/* eslint-enable no-unused-vars */

/**
 */
class TestEngine {
	/**
	 * @param {TestEngine.Params} params
	 */
	constructor(params) {
		/**
		 * @type {BlockCollection}
		 * @private
		 */
		this._blockCollection = params.blockCollection;

		/**
		 * @type {Array<Test>}
		 * @private
		 */
		this._tests = this._createTests();
	}

	/**
	 * @return {Array<LinterError>}
	 */
	run() {
		return this._tests
			.reduce((prev, test) => prev.concat(test.run()), []);
	}

	/**
	 * @return {Array<Test>}
	 * @private
	 */
	_createTests() {
		return [
			new InputLabelSize(this._blockCollection),
		];
	}
}

/**
 * @typedef {{
 *     blockCollection: BlockCollection
 * }}
 */
TestEngine.Params;

module.exports = TestEngine;
