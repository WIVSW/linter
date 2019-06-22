const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeaderTextSize extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'FORM.FOOTER_TEXT_SIZE_IS_INVALID',
			message: 'Не валидный размер текста footer',
			location,
		});
	}
}

module.exports = HeaderTextSize;
