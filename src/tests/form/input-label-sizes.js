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
		return collection
			.getBlocksByName('form')
			.filter((block) => block.children.length);
	}

	/**
	 * @param {Block} block
	 * @return {boolean}
	 * @protected
	 */
	_isValidBlock(block) {
		return this._collection
			.getAllBlockChidren(block)
			.filter((child) => child.isFormTextElement() && child.mods['size'])
			.map((child) => child.mods['size'])
			.filter((val, i, self) => self.indexOf(val) === i)
			.length <= 1;
	}
}

module.exports = InputLabelSize;
