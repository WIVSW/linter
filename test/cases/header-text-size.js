const assert = require('assert');
const valid = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "content": [
                {
                    "block": "text",
                    "mods": {
                        "size": "xxl"
                    }
                }
            ]
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
            "content": [
                {
                    "block": "text",
                    "mods": {
                        "size": "xl"
                    }
                }
            ]
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
		'code': 'FORM.HEADER_TEXT_SIZE_IS_INVALID',
		'error': 'Не валидный размер текста header',
		'location': {
			'start': {'column': 17, 'line': 8},
			'end': {'column': 18, 'line': 13},
		},
	},
];

it('FORM.HEADER_TEXT_SIZE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(
			codes.includes('FORM.HEADER_TEXT_SIZE_IS_INVALID'), false);
	});

	global.linter(invalid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(
			codes.includes('FORM.HEADER_TEXT_SIZE_IS_INVALID'), true);
	});
});
