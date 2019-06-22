const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class ContentItemIndent extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'FORM.CONTENT_ITEM_INDENT_IS_INVALID',
			message: 'Не валидные отступы между строк формы',
			location,
		});
	}
}

module.exports = ContentItemIndent;
