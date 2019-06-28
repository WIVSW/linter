const Test = require('../test.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class Space extends Test {
	/**
	 * @param {Space.Params} params
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
		return collection.getElementsByName('form', this._elem);
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

		const mixes = block.mix.filter((mix) =>
			mix.block === 'form' &&
			mix.elem === 'item' &&
			typeof mix.mods[this._mod] === 'string'
		);

		return mixes.length === 1 &&
			mixes[0].mods[this._mod] === expected;
	}
}


/**
 * @typedef {{
 *     collection: BlockCollection,
 *     Model: Function,
 *     elem: string,
 *     mod: string,
 *     step: number
 * }}
 */
Space.Params;

module.exports = Space;
