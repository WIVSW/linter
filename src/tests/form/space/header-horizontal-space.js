const SpaceTest = require('../space.js');
const HeaderHorizontalSpaceError =
	require('../../../models/errors/form/header-horizontal-space.js');
const Block = require('../../../models/block.js');
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
		const {HEADER} = Block.ElementsNames;
		const {SPACE_H} = Block.Mods;
		super({
			Model: HeaderHorizontalSpaceError,
			collection,
			elem: HEADER,
			mod: SPACE_H,
			step: 1,
		});
	}
}

module.exports = HeaderHorizontalSpace;
