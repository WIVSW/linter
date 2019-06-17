const LinterError = require('./models/linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('./collections/block.js');
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
		 * @type {Array}
		 * @private
		 */
		this._tests = this._createTests();
	}

	/**
	 * @return {Array<LinterError>}
	 */
	run() {
		return this._tests
			.map((test) => test.run())
			.filter((status) => status instanceof LinterError);
	}

	/**
	 * @return {Array}
	 * @private
	 */
	_createTests() {
		return [];
	}
}

/**
 * @typedef {{
 *     blockCollection: BlockCollection
 * }}
 */
TestEngine.Params;

module.exports = TestEngine;
