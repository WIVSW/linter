const assert = require('assert');
const valid = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;

const invalid = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;

const expected = [
	{
		'code': 'TEXT.SEVERAL_H1',
		'error': 'Заголовок первого уровня должен быть один на странице',
		'location': {
			'start': {'column': 5, 'line': 6},
			'end': {'column': 6, 'line': 9},
		},
	},
];

it('TEXT.SEVERAL_H1', () => {
	global.linter(valid, (actual) => {
		assert.deepStrictEqual(actual, []);
	});

	global.linter(invalid, (actual) => {
		assert.deepStrictEqual(actual, expected);
	});
});
