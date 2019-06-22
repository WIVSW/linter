const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeaderHorizontalSpace extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID',
			message: 'Горизонтальный внутренний отступ заголовка формы не валиден',
			location,
		});
	}
}

module.exports = HeaderHorizontalSpace;
