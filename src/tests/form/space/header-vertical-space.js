const SpaceTest = require('../space.js');
const HeaderVerticalSpaceError =
	require('../../../models/errors/form/header-vertical-space.js');
const Block = require('../../../models/block.js');
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
		const {HEADER} = Block.ElementsNames;
		const {SPACE_V} = Block.Mods;
		super({
			Model: HeaderVerticalSpaceError,
			collection,
			elem: HEADER,
			mod: SPACE_V,
			step: 0,
		});
	}
}

module.exports = HeaderVerticalSpace;
