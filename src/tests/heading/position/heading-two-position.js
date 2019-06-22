const PositionTest = require('../position.js');
const HeadingTwoPositionError =
	require('../../../models/errors/heading/heading-two-position.js');
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
		super({
			Model: HeadingTwoPositionError,
			collection,
			targetType: 'h2',
			higherType: 'h1',
		});
	}
}

module.exports = HeadingTwoPosition;
