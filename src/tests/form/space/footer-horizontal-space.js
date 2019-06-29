const SpaceTest = require('../space.js');
const FooterHorizontalSpaceError =
	require('../../../models/errors/form/footer-horizontal-space.js');
const Block = require('../../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class FooterHorizontalSpace extends SpaceTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		const {FOOTER} = Block.ElementsNames;
		const {SPACE_H} = Block.Mods;
		super({
			Model: FooterHorizontalSpaceError,
			collection,
			elem: FOOTER,
			mod: SPACE_H,
			step: 1,
		});
	}
}

module.exports = FooterHorizontalSpace;
