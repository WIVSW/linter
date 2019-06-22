const PositionTest = require('../position.js');
const HeadingThreePositionError =
	require('../../../models/errors/heading/heading-three-position.js');
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
		super({
			Model: HeadingThreePositionError,
			collection,
			targetType: 'h3',
			higherType: 'h2',
		});
	}
}

module.exports = HeadingThreePosition;
