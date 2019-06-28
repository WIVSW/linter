const Test = require('../test.js');
const InputLabelSizeError =
	require('../../models/errors/form/input-label-sizes.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
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
		const sizes = this._collection
			.getAllBlockChidren(block)
			.filter((child) =>
				this._collection.isFormTextElement(child)
			)
			.map((child) => child.mods['size'])
			.filter((val, i, self) => self.indexOf(val) === i);

		return sizes.length === 1 &&
			Boolean(Block.getSiblingSize(sizes[0], 0));
	}
}

module.exports = InputLabelSize;
