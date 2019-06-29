const ExpectedSizeTest = require('./expected-size.js');
const ContentItemIndentError =
	require('../../models/errors/form/content-item-indent.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class ContentItemIndent extends ExpectedSizeTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		const {INDENT_B} = Block.Mods;
		const {CONTENT_ITEM} = Block.ElementsNames;
		super({
			Model: ContentItemIndentError,
			collection,
			elem: CONTENT_ITEM,
			mod: INDENT_B,
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
		const {FORM} = Block.BlockNames;
		const {ITEM} = Block.ElementsNames;
		const mixes = block.mix.filter((mix) =>
			mix.block === FORM &&
			mix.elem === ITEM &&
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
