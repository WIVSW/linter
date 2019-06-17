/**
 * @interface
 */
const ExpressionStatement = function() {};


/**
 * @type {Object}
 * @externs
 */
ExpressionStatement.prototype.expression;


/**
 * @type {Object}
 * @externs
 */
ExpressionStatement.prototype.loc;


/**
 * @type {ExpressionStatement.Types}
 * @externs
 */
ExpressionStatement.prototype.type;


/**
 * @enum {string}
 */
ExpressionStatement.Types = {
	OBJECT: 'ObjectExpression',
	ARRAY: 'ArrayExpression',
};


module.exports = ExpressionStatement;
