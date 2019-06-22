const SpaceTest = require('../space.js');
const HeaderVerticalSpaceError =
	require('../../../models/errors/form/header-vertical-space.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeaderVerticalSpace extends SpaceTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: HeaderVerticalSpaceError,
			collection,
			elem: 'header',
			mod: 'space-v',
			step: 0,
		});
	}
}

module.exports = HeaderVerticalSpace;
