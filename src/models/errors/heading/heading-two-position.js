const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeadingTwoPosition extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'TEXT.INVALID_H2_POSITION',
			message: 'Заголовок второго уровня не может следовать ' +
				'перед заголовком первого уровня',
			location,
		});
	}
}

module.exports = HeadingTwoPosition;
