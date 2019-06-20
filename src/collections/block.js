const Block = require('../models/block.js');
const {Syntax} = require('../../node_modules/esprima/dist/esprima.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const ExpressionStatement = require('../../externs/expression-statement.js');
/* eslint-enable no-unused-vars */

/**
 */
class BlockCollection {
	/**
	 * @param {Object} ast
	 */
	constructor(ast) {
		const list = this._parse(ast);

		/**
		 * @type {Array<Block>}
		 * @private
		 */
		this._list = list ? list : [];
	}

	/**
	 * @return {Array<Object>}
	 */
	getAllItems() {
		return this._list;
	}

	/**
	 * @param {number} id
	 * @return {?Block}
	 */
	getById(id) {
		return this._list[id] || null;
	}

	/**
	 * @param {string} name
	 * @return {Array<Block>}
	 */
	getBlocksByName(name) {
		return this._list.filter((item) =>
			item.block === name &&
			!item.isElement()
		);
	}

	/**
	 * @param {string} blockName
	 * @param {string} elemName
	 * @return {Array<Block>}
	 */
	getElementsByName(blockName, elemName) {
		return this._list
			.filter((block) =>
				block.block === blockName &&
				block.elem === elemName
			);
	}

	/**
	 * @param {string} block
	 * @param {string} elem
	 * @param {string} mod
	 * @return {Array<Block>}
	 */
	getElementsWithMod(block, elem, mod) {
		return this._list
			.filter((item) =>
				item.block === block &&
				item.elem === elem &&
				item.mix.some((mixed) => mixed.mods[mod])
			);
	}

	/**
	 * @param {Block} block
	 * @return {Array<Block>}
	 */
	getDirectChildren(block) {
		return block.children
			.map((id) => this.getById(id));
	}

	/**
	 * @param {Block} block
	 * @return {Array<Block>}
	 */
	getAllBlockChidren(block) {
		const children = (childIds) => childIds.reduce((prev, id) => {
			const elem = this.getById(id);
			return prev
				.concat([elem])
				.concat(children(elem.children));
		}, []);
		return children(block.children);
	}

	/**
	 * @param {Object} ast
	 * @return {?Array<Block>}
	 * @private
	 */
	_parse(ast) {
		const source = this._getFirstArrayOfObjectExpressions(ast);

		if (!source) {
			return null;
		}

		return this._createBlocksList(source);
	}

	/**
	 * @param {Array<Object>} source
	 * @return {Array<Block>}
	 * @private
	 */
	_createBlocksList(source) {
		const children = (parent, currentId, optParentId) => {
			const block = new Block(parent, currentId, optParentId);
			const childs = Block.getChildren(parent);

			return [block].concat(childs.reduce((prev, objExp) => {
				const childId = Block.childId(currentId, prev.length);
				block.children.push(/** @type {number} */ (childId));
				return prev.concat(children(objExp, childId, currentId));
			}, []));
		};

		return source.reduce(
			(prev, objExp) =>
				prev.concat(children(objExp, prev.length, null)), []
		);
	}

	/**
	 * @param {Object} ast
	 * @return {?Array<Object>}
	 * @private
	 */
	_getFirstArrayOfObjectExpressions(ast) {
		const body = /** @type {ExpressionStatement} */ (ast && ast.body);
		const expression = body && body[0] && body[0].expression;

		if (!expression) {
			return null;
		}

		let expressions = null;

		switch (expression.type) {
		case Syntax.ObjectExpression:
			/**
			 * Fix incorrect position because of
			 * workaround in index file
			 * @see src/index.js:8
			 */
			expression.loc.start.column -= 1;
			expressions = [expression];
			break;
		case Syntax.ArrayExpression:
			expressions = expression.elements;
			break;
		}

		return expressions;
	}
}

module.exports = BlockCollection;
