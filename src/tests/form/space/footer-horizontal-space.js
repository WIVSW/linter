const SpaceTest = require('../space.js');
const FooterHorizontalSpaceError =
	require('../../../models/errors/form/footer-horizontal-space.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class FooterHorizontalSpace extends SpaceTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: FooterHorizontalSpaceError,
			collection,
			elem: 'footer',
			mod: 'space-h',
			step: 1,
		});
	}
}

module.exports = FooterHorizontalSpace;
