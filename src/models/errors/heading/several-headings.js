const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class SeveralHeadings extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'TEXT.SEVERAL_H1',
			message: 'Заголовок первого уровня должен быть один на странице',
			location,
		});
	}
}

module.exports = SeveralHeadings;
