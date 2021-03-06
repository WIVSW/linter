const Test = require('../test.js');
const SeveralHeadingsError =
	require('../../models/errors/heading/several-headings.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class SeveralHeadings extends Test {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: SeveralHeadingsError,
			collection,
		});

		/**
		 * @type {Block}
		 * @private
		 */
		this._fisrtHeading = null;
	}

	/**
	 * @param {BlockCollection} collection
	 * @return {Array<Block>}
	 * @protected
	 */
	_selectBlocks(collection) {
		const {H1} = Block.TextTypes;
		const headings = collection.getHeadings(H1);

		if (headings.length) {
			this._fisrtHeading = headings[0];
		}

		return headings;
	}

	/**
	 * @param {Block} block
	 * @return {boolean}
	 * @protected
	 */
	_isValidBlock(block) {
		return block.id === this._fisrtHeading.id;
	}
}

module.exports = SeveralHeadings;
