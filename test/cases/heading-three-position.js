const assert = require('assert');

describe('TEXT.INVALID_H3_POSITION', () => {
	it('Should work with simple data', () => {
		const valid = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h3" }
    }
]`;

		const invalid = `[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;

		const expected = [
			{
				'code': 'TEXT.INVALID_H3_POSITION',
				'error': 'Заголовок третьего уровня не может следовать ' +
					'перед заголовком второго уровня',
				'location': {
					'start': {'column': 5, 'line': 2},
					'end': {'column': 6, 'line': 5},
				},
			},
		];

		global.linter(valid, (actual) => {
			assert.deepStrictEqual(actual, []);
		});

		global.linter(invalid, (actual) => {
			assert.deepStrictEqual(actual, expected);
		});
	});

	it('Should work with complex data', () => {
		const valid = `[
	{
		"block": "my-block",
		"content": {
			"block": "text",
            "mods": { "type": "h2" }
		}
	},
    {
		"block": "my-block",
		"content": {
			"block": "text",
            "mods": { "type": "h3" }
		}
	}
]`;

		const invalid = `[
    {
		"block": "my-block",
		"content": {
			"block": "text",
            "mods": { "type": "h3" }
		}
	},
    {
		"block": "my-block",
		"content": {
			"block": "text",
            "mods": { "type": "h2" }
		}
	}
]`;

		const expected = [
			{
				'code': 'TEXT.INVALID_H3_POSITION',
				'error': 'Заголовок третьего уровня не может следовать ' +
					'перед заголовком второго уровня',
				'location': {
					'start': {'column': 14, 'line': 4},
					'end': {'column': 4, 'line': 7},
				},
			},
		];

		global.linter(valid, (actual) => {
			assert.deepStrictEqual(actual, []);
		});

		global.linter(invalid, (actual) => {
			assert.deepStrictEqual(actual, expected);
		});
	});
});
