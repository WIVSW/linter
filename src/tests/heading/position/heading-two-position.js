const PositionTest = require('../position.js');
const HeadingTwoPositionError =
	require('../../../models/errors/heading/heading-two-position.js');
const Block = require('../../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeadingTwoPosition extends PositionTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		const {H1, H2} = Block.TextTypes;
		super({
			Model: HeadingTwoPositionError,
			collection,
			targetType: H2,
			higherType: H1,
		});
	}
}

module.exports = HeadingTwoPosition;
