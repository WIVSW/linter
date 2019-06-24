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
		const codes = actual.map((err) => err.code);
		assert.strictEqual(actual.length, 1);
		assert.strictEqual(
			codes.includes('FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID'), false);
		assert.strictEqual(
			codes.includes('FORM.FOOTER_VERTICAL_SPACE_IS_INVALID'), true);
	});

	global.linter(invalid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(actual.length, 2);
		assert.strictEqual(
			codes.includes('FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID'), true);
		assert.strictEqual(
			codes.includes('FORM.FOOTER_VERTICAL_SPACE_IS_INVALID'), true);
	});
});
