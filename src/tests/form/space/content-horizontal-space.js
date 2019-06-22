const SpaceTest = require('../space.js');
const ContentHorizontalSpaceError =
	require('../../../models/errors/form/content-horizontal-space.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class ContentHorizontalSpace extends SpaceTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: ContentHorizontalSpaceError,
			collection,
			elem: 'content',
			mod: 'space-h',
			step: 1,
		});
	}
}

module.exports = ContentHorizontalSpace;