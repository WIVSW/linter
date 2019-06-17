/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../collections/block.js');
const LinterError = require('../models/linter-error.js');
const Block = require('../models/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class Test {
	/**
	 * @param {Test.Params} params
	 */
	constructor(params) {
		/**
		 * @type {BlockCollection}
		 * @private
		 */
		this._collection = params.collection;

		/**
		 * @type {Function}
		 * @private
		 */
		this._Model = params.Model;
	}

	/**
	 * @return {Array<LinterError>}
	 */
	run() {
		const blocks = this._selectBlocks(this._collection);
		return blocks
			.filter((block) => !this._isValidBlock(block))
			.map((block) => this._createError(block));
	}

	/**
	 * @param {BlockCollection} collection
	 * @return {Array<Block>}
	 * @protected
	 */
	_selectBlocks(collection) {
		return [];
	}

	/**
	 * @param {Block} block
	 * @return {boolean}
	 * @protected
	 */
	_isValidBlock(block) {
		return false;
	}

	/**
	 * @param {Block} block
	 * @return {LinterError}
	 * @protected
	 */
	_createError(block) {
		return new this._Model(block.location);
	}
}


/**
 * @typedef {{
 *     collection: BlockCollection,
 *     Model: Function
 * }}
 */
Test.Params;

module.exports = Test;
