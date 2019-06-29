const SpaceTest = require('../space.js');
const ContentHorizontalSpaceError =
	require('../../../models/errors/form/content-horizontal-space.js');
const Block = require('../../../models/block.js');
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
		const {CONTENT} = Block.ElementsNames;
		const {SPACE_H} = Block.Mods;
		super({
			Model: ContentHorizontalSpaceError,
			collection,
			elem: CONTENT,
			mod: SPACE_H,
			step: 1,
		});
	}
}

module.exports = ContentHorizontalSpace;
