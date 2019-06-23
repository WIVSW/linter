const Test = require('../test.js');
const ContentItemIndentError =
	require('../../models/errors/form/content-item-indent.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Block = require('../../models/block.js');
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class ContentItemIndent extends Test {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: ContentItemIndentError,
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
			.getElementsByName('form', 'content-item');
	}

	/**
	 * @param {Block} block
	 * @return {boolean}
	 * @protected
	 */
	_isValidBlock(block) {
		const refrence = this._collection.getRefrenceTextSize(block);
		const expected = refrence && Block.getSiblingSize(refrence, 1);

		if (!expected) {
			return false;
		}

		const mix = block.mix.find((mix) =>
			mix.block === 'form' &&
			mix.elem === 'item' &&
			typeof mix.mods['indent-b'] === 'string'
		);

		if (!mix) {
			return true;
		}

		const isMixIndentValid = mix.mods['indent-b'] === expected;

		return isMixIndentValid && block.mods['indent-b'] === expected;
	}
}

module.exports = ContentItemIndent;
