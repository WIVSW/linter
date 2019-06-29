const ExpectedSizeTest = require('./expected-size.js');
const ContentItemIndentError =
	require('../../models/errors/form/content-item-indent.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Block = require('../../models/block.js');
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class ContentItemIndent extends ExpectedSizeTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: ContentItemIndentError,
			collection,
			elem: 'content-item',
			mod: 'indent-b',
			step: 1,
		});

		/**
		 * @type {Object<number, Array<number>>}
		 * @private
		 */
		this._parentToChidren = {};
	}

	/**
	 * @override
	 */
	_selectBlocks(collection) {
		const elements = super._selectBlocks(collection);

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
	 * @override
	 */
	_hasValidTextSize(block, expected, modName) {
		const mixes = block.mix.filter((mix) =>
			mix.block === 'form' &&
			mix.elem === 'item' &&
			typeof mix.mods[modName] === 'string'
		);

		if (!mixes.length) {
			return this._isLastChild(block);
		} else if (this._isLastChild(block)) {
			return false;
		}

		return mixes.length === 1 &&
			mixes[0].mods[modName] === expected;
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
}

module.exports = ContentItemIndent;
