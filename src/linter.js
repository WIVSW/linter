const BlockCollection = require('./collections/block.js');
const TestEngine = require('./test-engine.js');

/**
 */
class Linter {
	/**
	 * @param {Object} ast
	 */
	constructor(ast) {
		/**
		 * @type {BlockCollection}
		 * @private
		 */
		this._collection = new BlockCollection(ast);

		/**
		 * @type {TestEngine}
		 * @private
		 */
		this._engine = new TestEngine({
			blockCollection: this._collection,
		});
	}

	/**
	 * @return {Array<LinterError>}
	 */
	run() {
		return this._engine.run();
	}
}

module.exports = Linter;
