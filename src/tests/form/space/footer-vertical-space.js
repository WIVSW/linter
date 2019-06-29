const SpaceTest = require('../space.js');
const FooterVerticalSpaceError =
	require('../../../models/errors/form/footer-vertical-space.js');
const Block = require('../../../models/block.js');
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
		const {FOOTER} = Block.ElementsNames;
		const {SPACE_V} = Block.Mods;
		super({
			Model: FooterVerticalSpaceError,
			collection,
			elem: FOOTER,
			mod: SPACE_V,
			step: 0,
		});
	}
}

module.exports = FooterVerticalSpace;
