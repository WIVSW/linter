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

		/**
		 * @type {Object<number, Array<number>>}
		 * @private
		 */
		this._parentToChidren = {};
	}

	/**
	 * @param {BlockCollection} collection
	 * @return {Array<Block>}
	 * @protected
	 */
	_selectBlocks(collection) {
		const elements = collection
			.getElementsByName('form', 'content-item');

		elements.forEach((elem) => {
			if (typeof elem.parentId !== 'number') {
				return;
			}

			const parent = collection.getById(elem.parentId);

			if (parent && typeof parent.id === 'number') {
				this._parentToChidren[parent.id] = parent.children;
			}
		});

		return elements;
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

		const mixes = block.mix.filter((mix) =>
			mix.block === 'form' &&
			mix.elem === 'item' &&
			typeof mix.mods['indent-b'] !== 'undefined'
		);

		if (!mixes.length) {
			return this._isLastChild(block);
		} else if (this._isLastChild(block)) {
			return false;
		}

		return mixes.length === 1 &&
			mixes[0].mods['indent-b'] === expected;
	}

	/**
	 * @param {Block} elem
	 * @return {boolean}
	 */
	_isLastChild(elem) {
		if (typeof elem.parentId !== 'number') {
			return false;
		}

		const children = this._parentToChidren[elem.parentId];

		if (!children) {
			return false;
		}

		const lastChildId = children.slice(-1)[0];

		return typeof lastChildId === 'number' ?
			lastChildId === elem.id : false;
	}

	/**
	 * @param {Block} block
	 * @return {?string}
	 * @private
	 */
	_mod(block) {
		return block.mods['indent-b'];
	}
}

module.exports = ContentItemIndent;
