const SpaceTest = require('../space.js');
const ContentVerticalSpaceError =
	require('../../../models/errors/form/content-vertical-space.js');
const Block = require('../../../models/block.js');
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
		const {CONTENT} = Block.ElementsNames;
		const {SPACE_V} = Block.Mods;
		super({
			Model: ContentVerticalSpaceError,
			collection,
			elem: CONTENT,
			mod: SPACE_V,
			step: 2,
		});
	}
}

module.exports = ContentVerticalSpace;
