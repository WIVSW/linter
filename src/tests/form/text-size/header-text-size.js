const TextSizeTest = require('../text-size.js');
const HeaderTextSizeError =
	require('../../../models/errors/form/header-text-size.js');
const Block = require('../../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeaderTextSize extends TextSizeTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		const {HEADER} = Block.ElementsNames;
		super({
			Model: HeaderTextSizeError,
			collection,
			elem: HEADER,
			step: 2,
		});
	}
}

module.exports = HeaderTextSize;
