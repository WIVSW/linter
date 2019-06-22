const Test = require('../test.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Block = require('../../models/block.js');
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class Position extends Test {
	/**
	 * @param {Position.Params} params
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
		this._targetType = params.targetType;

		/**
		 * @type {string}
		 * @private
		 */
		this._higherType = params.higherType;

		/**
		 * @type {?Block}
		 * @private
		 */
		this._lastHighestHeading = null;
	}

	/**
	 * @override
	 */
	_selectBlocks(collection) {
		this._lastHighestHeading = collection
			.getHeadings(this._higherType)
			.sort((a, b) => a.id - b.id)
			.slice(-1)[0] || null;

		return collection.getHeadings(this._targetType);
	}

	/**
	 * @override
	 */
	_isValidBlock(block) {
		return this._lastHighestHeading ?
			block.id > this._lastHighestHeading.id : true;
	}
}


/**
 * @typedef {{
 *     collection: BlockCollection,
 *     Model: Function,
 *     targetType: string,
 *     higherType: string
 * }}
 */
Position.Params;

module.exports = Position;
