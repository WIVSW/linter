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

		/**
		 * @type {Object<number, ?string>}
		 * @private
		 */
		this._formsSizeCache = {};
	}

	/**
	 * @param {Block} block
	 * @return {boolean}
	 */
	isFormTextElement(block) {
		const {INPUT, TEXT, LABEL, BUTTON} = Block.TextElements;
		const blocks = [INPUT, BUTTON];

		if (blocks.includes(block.block)) {
			return true;
		}

		if (block.block === TEXT && typeof block.parentId === 'number') {
			const parent = this.getById(block.parentId);

			return parent ?
				parent.block === 'form' &&
				parent.elem === LABEL : false;
		}

		return false;
	}

	/**
	 * @param {Block} childBlock
	 * @return {?Block}
	 */
	getForm(childBlock) {
		let parent = childBlock;
		const isForm = (block) => block.block === 'form' && !block.isElement();

		while (
			parent &&
			!isForm(parent) &&
			typeof parent.parentId === 'number'
		) {
			parent = this.getById(parent.parentId);
		}

		return parent && isForm(parent) ?
			parent : null;
	}

	/**
	 * @param {Block} childBlock
	 * @return {?string}
	 */
	getRefrenceTextSize(childBlock) {
		const form = this.getForm(childBlock);

		if (!form || typeof form.id !== 'number') {
			return null;
		}

		if (typeof this._formsSizeCache[form.id] === 'undefined') {
			this._formsSizeCache[form.id] = this._getRefrenceTextSize(form);
		}

		return this._formsSizeCache[form.id];
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
	 * @param {string} type
	 * @return {Array<Block>}
	 */
	getHeadings(type) {
		return this._list
			.filter((block) =>
				block.block === 'text' &&
				block.mods['type'] === type
			);
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
	 * @param {Block} formBlock
	 * @return {?string}
	 * @private
	 */
	_getRefrenceTextSize(formBlock) {
		const sizes = this
			.getAllBlockChidren(formBlock)
			.filter((child) => this.isFormTextElement(child))
			.map((child) => child.mods['size'])
			.filter((val, i, self) => self.indexOf(val) === i);

		return sizes.length === 1 ? sizes[0] : null;
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
