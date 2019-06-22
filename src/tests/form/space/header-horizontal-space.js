const SpaceTest = require('../space.js');
const HeaderHorizontalSpaceError =
	require('../../../models/errors/form/header-horizontal-space.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeaderHorizontalSpace extends SpaceTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: HeaderHorizontalSpaceError,
			collection,
			elem: 'header',
			mod: 'space-h',
			step: 1,
		});
	}
}

module.exports = HeaderHorizontalSpace;
