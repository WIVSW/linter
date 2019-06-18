/* eslint-disable no-unused-vars */
/* import types for GCC */
const Location = require('./location.js');
/* eslint-enable no-unused-vars */

/**
 */
class LinterError extends Error {
	/**
	 * @param {LinterError.Params} params
	 */
	constructor(params) {
		super(params.message);

		/** @type {string} */
		this.code;

		/** @type {string} */
		this.message;

		/** @type {Location} */
		this.location;

		this._parse(params);
	}

	/**
	 * @return {Object}
	 */
	toObject() {
		return {
			'code': this.code,
			'error': this.message,
			'location': this.location.toObject(),
		};
	}

	/**
	 * @param {LinterError.Params} params
	 * @private
	 */
	_parse(params) {
		this.code = params.code;
		this.location = params.location;
	}
}

/**
 * @typedef {{
 *     code: string,
 *     message: string,
 *     location: Location
 * }}
 */
LinterError.Params;

module.exports = LinterError;
