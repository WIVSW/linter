const SpaceTest = require('../space.js');
const FooterVerticalSpaceError =
	require('../../../models/errors/form/footer-vertical-space.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class FooterVerticalSpace extends SpaceTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: FooterVerticalSpaceError,
			collection,
			elem: 'footer',
			mod: 'space-v',
			step: 0,
		});
	}
}

module.exports = FooterVerticalSpace;
