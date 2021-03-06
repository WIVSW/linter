const assert = require('assert');
const valid = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "l" }
            }
        },
        { "block": "input", "mods": { "size": "l" } }
    ]
}`;

const invalid = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "l" }
            }
        },
        { "block": "input", "mods": { "size": "s" } }
    ]
}`;

const expected = [
	{
		'code': 'FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL',
		'error': 'Подписи и поля в форме должны быть одного размера',
		'location': {
			'start': {'column': 1, 'line': 1},
			'end': {'column': 2, 'line': 14},
		},
	},
];

const hardInvalid = JSON.stringify(
	require('./_data/input-label-sizes/hard-invalid.json'), null, 4);

it('FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL', () => {
	global.linter(valid, (actual) => {
		assert.deepStrictEqual(actual, []);
	});

	global.linter(invalid, (actual) => {
		assert.deepStrictEqual(actual, expected);
	});

	global.linter(hardInvalid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(actual.length, 1);
		assert.strictEqual(
			codes.includes('FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL'), true);
	});
});
