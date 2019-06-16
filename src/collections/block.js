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
	}

	/**
	 * @param {Object} ast
	 * @return {?Array<Object>}
	 * @private
	 */
	_getFirstArrayOfObjectExpressions(ast) {
		const body = ast && ast.body;
		const expression = body && body[0] && body[0].expression;

		if (!expression) {
			return null;
		}

		let expressions = null;

		switch (expression.type) {
		case 'ObjectExpression':
			/**
			 * Fix incorrect position because of
			 * workaround in index file
			 * @see src/index.js:8
			 */
			expression.loc.start.column -= 1;
			expressions = [expression];
			break;
		case 'ArrayExpression':
			expressions = expression.elements;
			break;
		}

		return expressions;
	}
}

module.exports = BlockCollection;
