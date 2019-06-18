const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class InputLabelSize extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL',
			message: 'Подписи и поля в форме должны быть одного размера',
			location,
		});
	}
}

module.exports = InputLabelSize;
