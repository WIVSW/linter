const Test = require('../test.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class ContentSpace extends Test {
	/**
	 * @param {ContentSpace.Params} params
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
		this._mod = params.mod;

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
			.getElementsByName('form', 'content');
	}

	/**
	 * @override
	 */
	_isValidBlock(block) {
		const mixes = block.mix.filter((mixed) => mixed.mods[this._mod]);
		const inputs = this._collection
			.getDirectChildren(block)
			.filter((child) =>
				child.block === 'input' &&
				child.mods['size']
			);

		if (mixes.length !== 1 || inputs.length !== 1) {
			return true;
		}

		const size = inputs[0].mods['size'];
		const expected = Block.getSiblingSize(size, this._step);
		const actual = mixes[0].mods[this._mod];

		return expected === actual;
	}
}


/**
 * @typedef {{
 *     collection: BlockCollection,
 *     Model: Function,
 *     mod: string,
 *     step: number
 * }}
 */
ContentSpace.Params;

module.exports = ContentSpace;
