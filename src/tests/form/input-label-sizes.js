const Test = require('../test.js');
const InputLabelSizeError =
	require('../../models/errors/form/input-label-sizes.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Block = require('../../models/block.js');
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class InputLabelSize extends Test {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: InputLabelSizeError,
			collection,
		});
	}

	/**
	 * @param {BlockCollection} collection
	 * @return {Array<Block>}
	 * @protected
	 */
	_selectBlocks(collection) {
		return collection.getBlocksByName('form');
	}

	/**
	 * @param {Block} block
	 * @return {boolean}
	 * @protected
	 */
	_isValidBlock(block) {
		return Boolean(this._collection.getRefrenceTextSize(block));
	}
}

module.exports = InputLabelSize;
