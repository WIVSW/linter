const Test = require('../test.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class ExpectedSize extends Test {
	/**
	 * @param {ExpectedSize.Params} params
	 */
	constructor(params) {
		super({
			Model: params.Model,
			collection: params.collection,
		});

		/**
		 * @type {string}
		 * @protected
		 */
		this._elem = params.elem;

		/**
		 * @type {string}
		 * @protected
		 */
		this._mod = params.mod;

		/**
		 * @type {number}
		 * @protected
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
			// ignore input label size error
			return true;
		}

		return this._hasValidTextSize(block, expected, this._mod);
	}

	/**
	 * @param {Block} block
	 * @param {string} expected
	 * @param {string} modName
	 * @return {boolean}
	 * @protected
	 */
	_hasValidTextSize(block, expected, modName) {
		return true;
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
ExpectedSize.Params;

module.exports = ExpectedSize;
