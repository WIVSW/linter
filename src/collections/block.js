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
		 * @type {Array<Object>}
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
	 * @param {Object} ast
	 * @return {?Array<Object>}
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
		const children = (parent, currentId) => {
			const block = new Block(parent, currentId);
			const childs = Block.getChildren(parent);

			return [block].concat(childs.reduce((prev, objExp) =>
				prev.concat(children(objExp, prev.length + currentId + 1)),
			[]));
		};

		return source.reduce(
			(prev, objExp) =>
				prev.concat(children(objExp, prev.length)), []
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
