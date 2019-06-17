/**
 */
class Location {
	/**
	 * @param {Object} data
	 */
	constructor(data) {
		/** @type {Location.Coords} */
		this.start;

		/** @type {Location.Coords} */
		this.end;

		this._parse(data);
	}

	/**
	 * @param {Object} data
	 */
	_parse(data) {
		this.start = {
			column: (data.start.column + 1),
			line: data.start.line,
		};

		this.end = {
			column: data.end.column,
			line: data.end.line,
		};
	}
}


/**
 * @typedef {{
 *     column: number,
 *     line: number
 * }}
 */
Location.Coords;

module.exports = Location;
