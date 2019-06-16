/**
 */
class Block {
	/**
	 * @param {Object} objExp
	 * @param {number} id
	 * @param {number=} optParentId
	 */
	constructor(objExp, id, optParentId) {}

	/**
	 * @param {Object} parent
	 * @return {Array<Object>}
	 */
	static getChildren(parent) {
		const props = parent.properties;
		const arrayProp = props && props
			.find((prop) => prop.key && prop.key.value === 'content');
		const value = arrayProp && arrayProp.value;

		if (value) {
			if (value.type === 'ObjectExpression') {
				return [value];
			} else if (value.elements) {
				return value.elements;
			}
		}

		return [];
	};
}

module.exports = Block;
