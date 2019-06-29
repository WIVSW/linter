const ExpectedSizeTest = require('./expected-size.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class TextSize extends ExpectedSizeTest {
	/**
	 * @param {TextSize.Params} params
	 */
	constructor(params) {
		super({
			Model: params.Model,
			collection: params.collection,
			elem: params.elem,
			step: params.step,
			mod: 'size',
		});
	}

	/**
	 * @override
	 */
	_selectBlocks(collection) {
		return super
			._selectBlocks(collection)
			.map((elem) => collection.getAllBlockChidren(elem))
			.reduce((prev, curr) => prev.concat(curr), [])
			.filter((child) => child.block === Block.TextElements.TEXT);
	}

	/**
	 * @override
	 */
	_hasValidTextSize(block, expected, modName) {
		if (typeof block.mods[modName] !== 'string') {
			return true;
		}

		return block.mods[modName] === expected;
	}
}


/**
 * @typedef {{
 *     collection: BlockCollection,
 *     Model: Function,
 *     elem: string,
 *     step: number
 * }}
 */
TextSize.Params;

module.exports = TextSize;
