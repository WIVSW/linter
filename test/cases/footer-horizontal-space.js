const assert = require('assert');
const valid = `{
    "block": "form",
    "content": [
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "form",
            "elem": "footer",
            "mix": [ { "block": "form", "elem": ` +
				`"item", "mods": { "space-h": "xl" } } ]
        }
    ]
}`;

const invalid = `{
    "block": "form",
    "content": [
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "form",
            "elem": "footer",
            "mix": [ { "block": "form", "elem": ` +
				`"item", "mods": { "space-h": "s" } } ]
        }
    ]
}`;

const expected = [
	{
		'code': 'FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID',
		'error': 'Горизонтальный внутренний отступ подвала формы не валиден',
		'location': {
			'start': {'column': 9, 'line': 10},
			'end': {'column': 10, 'line': 14},
		},
	},
];

it('FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		assert.deepStrictEqual(actual, []);
	});

	global.linter(invalid, (actual) => {
		assert.deepStrictEqual(actual, expected);
	});
});
