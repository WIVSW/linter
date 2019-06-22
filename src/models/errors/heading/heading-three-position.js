const LinterError = require('../../linter-error.js');
/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('../../location.js');
/* eslint-enable no-unused-vars */

/**
 */
class HeadingThreePosition extends LinterError {
	/**
	 * @param {Location} location
	 */
	constructor(location) {
		super({
			code: 'TEXT.INVALID_H3_POSITION',
			message: 'Заголовок третьего уровня не может следовать ' +
				'перед заголовком второго уровня',
			location,
		});
	}
}

module.exports = HeadingThreePosition;
