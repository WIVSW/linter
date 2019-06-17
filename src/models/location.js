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
	 * @return {Object}
	 */
	toObject() {
		return {
			'start': {
				'column': this.start.column,
				'line': this.start.line,
			},
			'end': {
				'column': this.end.column,
				'line': this.end.line,
			},
		};
	}

	/**
	 * @param {Object} data
	 */
	_parse(data) {
		this.start = this._parseCoords(data.start);
		this.end = this._parseCoords(data.end);
	}

	/**
	 * @param {Object} raw
	 * @return {Location.Coords}
	 * @private
	 */
	_parseCoords(raw) {
		return {
			column: (raw.column + 1),
			line: raw.line,
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
