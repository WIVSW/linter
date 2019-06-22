const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class FooterVerticalSpace extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'FORM.FOOTER_VERTICAL_SPACE_IS_INVALID',
			message: 'Вертикальный внутренний отступ подвала формы не валиден',
			location,
		});
	}
}

module.exports = FooterVerticalSpace;
