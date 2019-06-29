const PositionTest = require('../position.js');
const HeadingThreePositionError =
	require('../../../models/errors/heading/heading-three-position.js');
const Block = require('../../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeadingThreePosition extends PositionTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		const {H2, H3} = Block.TextTypes;
		super({
			Model: HeadingThreePositionError,
			collection,
			targetType: H3,
			higherType: H2,
		});
	}
}

module.exports = HeadingThreePosition;
