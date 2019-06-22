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
				`"item", "mods": { "space-v": "l" } } ]
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
				`"item", "mods": { "space-v": "s" } } ]
        }
    ]
}`;

const expected = [
	{
		'code': 'FORM.FOOTER_VERTICAL_SPACE_IS_INVALID',
		'error': 'Вертикальный внутренний отступ подвала формы не валиден',
		'location': {
			'start': {'column': 9, 'line': 10},
			'end': {'column': 10, 'line': 14},
		},
	},
];

it('FORM.FOOTER_VERTICAL_SPACE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		assert.deepStrictEqual(actual, []);
	});

	global.linter(invalid, (actual) => {
		assert.deepStrictEqual(actual, expected);
	});
});
