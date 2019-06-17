const BlockCollection = require('./collections/block.js');

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
	}
};

module.exports = Linter;
