const SpaceTest = require('../space.js');
const ContentVerticalSpaceError =
	require('../../../models/errors/form/content-vertical-space.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class ContentVerticalSpace extends SpaceTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: ContentVerticalSpaceError,
			collection,
			elem: 'content',
			mod: 'space-v',
			step: 2,
		});
	}
}

module.exports = ContentVerticalSpace;