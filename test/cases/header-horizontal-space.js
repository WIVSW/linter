const assert = require('assert');
const valid = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": ` +
				`"item", "mods": { "space-h": "xl" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

const invalid = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": ` +
				`"item", "mods": { "space-h": "s" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

const expected = [
	{
		'code': 'FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID',
		'error': 'Горизонтальный внутренний отступ заголовка формы не валиден',
		'location': {
			'start': {'column': 9, 'line': 4},
			'end': {'column': 10, 'line': 8},
		},
	},
];

it('FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		assert.deepStrictEqual(actual, []);
	});

	global.linter(invalid, (actual) => {
		assert.deepStrictEqual(actual, expected);
	});
});
