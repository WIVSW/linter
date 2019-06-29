const assert = require('assert');

describe('TEXT.INVALID_H2_POSITION', () => {
	it('Should work with simple data', () => {
		const valid = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;

		const invalid = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;

		const expected = [
			{
				'code': 'TEXT.INVALID_H2_POSITION',
				'error': 'Заголовок второго уровня не может следовать ' +
					'перед заголовком первого уровня',
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
            "mods": { "type": "h1" }
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

		const invalid = `[
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
            "mods": { "type": "h1" }
		}
	}
]`;

		const expected = [
			{
				'code': 'TEXT.INVALID_H2_POSITION',
				'error': 'Заголовок второго уровня не может следовать ' +
					'перед заголовком первого уровня',
				'location': {
					'start': {'column': 20, 'line': 4},
					'end': {'column': 10, 'line': 7},
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
