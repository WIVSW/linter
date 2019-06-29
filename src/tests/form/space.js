const ExpectedSizeTest = require('./expected-size.js');
const Block = require('../../models/block.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class Space extends ExpectedSizeTest {
	/**
	 * @param {Space.Params} params
	 */
	constructor(params) {
		super({
			Model: params.Model,
			collection: params.collection,
			elem: params.elem,
			mod: params.mod,
			step: params.step,
		});
	}

	/**
	 * @override
	 */
	_hasValidTextSize(block, expected, modName) {
		const {FORM} = Block.BlockNames;
		const {ITEM} = Block.ElementsNames;
		const mixes = block.mix.filter((mix) =>
			mix.block === FORM &&
			mix.elem === ITEM &&
			typeof mix.mods[modName] === 'string'
		);

		return mixes.length === 1 &&
			mixes[0].mods[modName] === expected;
	}
}


/**
 * @typedef {{
 *     collection: BlockCollection,
 *     Model: Function,
 *     elem: string,
 *     mod: string,
 *     step: number
 * }}
 */
Space.Params;

module.exports = Space;
