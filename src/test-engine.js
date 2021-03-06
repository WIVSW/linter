const InputLabelSize = require('./tests/form/input-label-sizes.js');
const ContentVerticalSpace =
	require('./tests/form/space/content-vertical-space.js');
const ContentHorizontalSpace =
	require('./tests/form/space/content-horizontal-space.js');
const ContentItemIndent = require('./tests/form/content-item-indent.js');
const HeaderTextSize = require('./tests/form/text-size/header-text-size.js');
const FooterTextSize = require('./tests/form/text-size/footer-text-size.js');
const HeaderVerticalSpace =
	require('./tests/form/space/header-vertical-space.js');
const HeaderHorizontalSpace =
	require('./tests/form/space/header-horizontal-space.js');
const FooterVerticalSpace =
	require('./tests/form/space/footer-vertical-space.js');
const FooterHorizontalSpace =
	require('./tests/form/space/footer-horizontal-space.js');
const SeveralHeadings = require('./tests/heading/several-headings.js');
const HeadingTwoPosition =
	require('./tests/heading/position/heading-two-position.js');
const HeadingThreePosition =
	require('./tests/heading/position/heading-three-position.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const LinterError = require('./models/linter-error.js');
const BlockCollection = require('./collections/block.js');
const Test = require('./tests/test.js');
/* eslint-enable no-unused-vars */

/**
 */
class TestEngine {
	/**
	 * @param {TestEngine.Params} params
	 */
	constructor(params) {
		/**
		 * @type {BlockCollection}
		 * @private
		 */
		this._blockCollection = params.blockCollection;

		/**
		 * @type {Array<Test>}
		 * @private
		 */
		this._tests = this._createTests();
	}

	/**
	 * @return {Array<LinterError>}
	 */
	run() {
		return this._tests
			.reduce((prev, test) => prev.concat(test.run()), []);
	}

	/**
	 * @return {Array<Test>}
	 * @private
	 */
	_createTests() {
		return [
			new InputLabelSize(this._blockCollection),
			new ContentVerticalSpace(this._blockCollection),
			new ContentHorizontalSpace(this._blockCollection),
			new ContentItemIndent(this._blockCollection),
			new HeaderTextSize(this._blockCollection),
			new FooterTextSize(this._blockCollection),
			new HeaderVerticalSpace(this._blockCollection),
			new HeaderHorizontalSpace(this._blockCollection),
			new FooterVerticalSpace(this._blockCollection),
			new FooterHorizontalSpace(this._blockCollection),
			new SeveralHeadings(this._blockCollection),
			new HeadingTwoPosition(this._blockCollection),
			new HeadingThreePosition(this._blockCollection),
		];
	}
}

/**
 * @typedef {{
 *     blockCollection: BlockCollection
 * }}
 */
TestEngine.Params;

module.exports = TestEngine;
