const Test = require('../test.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class TextSize extends Test {
	/**
	 * @param {TextSize.Params} params
	 */
	constructor(params) {
		super({
			Model: params.Model,
			collection: params.collection,
		});

		/**
		 * @type {string}
		 * @private
		 */
		this._elem = params.elem;

		/**
		 * @type {number}
		 * @private
		 */
		this._step = params.step;
	}

	/**
	 * @override
	 */
	_selectBlocks(collection) {
		return collection
			.getElementsByName('form', this._elem)
			.map((elem) => collection.getAllBlockChidren(elem))
			.reduce((prev, curr) => prev.concat(curr), [])
			.filter((child) => child.block === Block.TextElements.TEXT);
	}

	/**
	 * @override
	 */
	_isValidBlock(block) {
		const refrence = this._collection.getRefrenceTextSize(block);
		const expected = refrence && Block.getSiblingSize(refrence, this._step);

		if (!expected) {
			return true;
		}

		if (typeof block.mods['size'] === 'undefined') {
			return false;
		}

		return block.mods['size'] === expected;
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
