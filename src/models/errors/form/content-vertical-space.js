const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class ContentVerticalSpace extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'FORM.CONTENT_VERTICAL_SPACE_IS_INVALID',
			message: 'Вертикальный внутренний отступ ' +
				'контентного элемента формы не валиден',
			location,
		});
	}
}

module.exports = ContentVerticalSpace;
