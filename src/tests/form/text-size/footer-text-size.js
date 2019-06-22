const TextSizeTest = require('../text-size.js');
const FooterTextSizeError =
	require('../../../models/errors/form/footer-text-size.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const BlockCollection = require('../../../collections/block.js');
/* eslint-enable no-unused-vars */

/**
 */
class FooterTextSize extends TextSizeTest {
	/**
	 * @param {BlockCollection} collection
	 */
	constructor(collection) {
		super({
			Model: FooterTextSizeError,
			collection,
			elem: 'footer',
			step: 0,
		});
	}
}

module.exports = FooterTextSize;
