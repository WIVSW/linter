const {Syntax} = require('../../node_modules/esprima/dist/esprima.js');

/**
 */
class Block {
	/**
	 * @param {Object} objExp
	 * @param {?number} id
	 * @param {number=} optParentId
	 */
	constructor(objExp, id, optParentId) {
		/** @type {?number} */
		this.id;

		/** @type {string} */
		this.block;

		/** @type {?string} */
		this.elem;

		/** @type {Array<number>} */
		this.children;

		/** @type {Object<string, string>} */
		this.mods;

		/** @type {Array<Block>} */
		this.mix;

		/** @type {?number} */
		this.parentId;

		this._parse(objExp, id, optParentId);
	}

	/**
	 * @param {Object} objExp
	 * @param {?number} id
	 * @param {number=} optParentId
	 */
	_parse(objExp, id, optParentId) {
		const block = Block.getProp(objExp, 'block');
		const elem = Block.getProp(objExp, 'elem');

		this.id = id;
		this.block = block ? block.value : '';
		this.elem = elem ? elem.value : null;
		this.children = Block.getChildren(objExp)
			.map((_, i) => Block.childId(id, i));
		this.mods = Block.getMods(objExp);
		this.mix = Block.getMix(objExp);
		this.parentId = optParentId || null;
	}

	/**
	 * @param {?number} parentIndex
	 * @param {number} currentIndex
	 * @return {?number}
	 */
	static childId(parentIndex, currentIndex) {
		if (typeof parentIndex !== 'number') {
			return null;
		}

		return parentIndex + currentIndex + 1;
	}

	/**
	 * @param {Object} objExp
	 * @param {string} name
	 * @return {?Object}
	 */
	static getProp(objExp, name) {
		const props = objExp.properties;
		const prop = props && props
			.find((prop) => prop.key && prop.key.value === name);

		if (!prop) {
			return null;
		}

		return prop.value;
	}

	/**
	 * @param {?Object=} value
	 * @return {Array<Object>}
	 */
	static toArray(value) {
		if (value) {
			if (value.type === Syntax.ObjectExpression) {
				return [value];
			} else if (value.elements) {
				return value.elements;
			}
		}

		return [];
	}

	/**
	 * @param {Object} objExp
	 * @return {Object<string, string>}
	 */
	static getMods(objExp) {
		const mods = {};

		const obj = Block.getProp(objExp, 'mods');
		const props = obj && obj.properties;

		if (props && props.length) {
			props.forEach((prop) => {
				mods[prop.key.value] = prop.value.value;
			});
		}

		return mods;
	}

	/**
	 * @param {Object} objExp
	 * @return {Array<Block>}
	 */
	static getMix(objExp) {
		return Block.toArray(Block.getProp(objExp, 'mix'))
			.map((data) => new Block(data, null));
	}

	/**
	 * @param {Object} parent
	 * @return {Array<Object>}
	 */
	static getChildren(parent) {
		return Block.toArray(Block.getProp(parent, 'content'));
	};
}

module.exports = Block;
