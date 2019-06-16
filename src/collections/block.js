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
		return null;
	}
}

module.exports = BlockCollection;
