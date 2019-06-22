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
            "content": [
                {
                    "block": "text",
                    "mods": {
                        "size": "l"
                    }
                }
            ]
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
            "content": [
                {
                    "block": "text",
                    "mods": {
                        "size": "xxl"
                    }
                }
            ]
        }
    ]
}`;

const expected = [
	{
		"code": "FORM.FOOTER_TEXT_SIZE_IS_INVALID",
		"error": "Не валидный размер текста footer",
		"location": {
			"start": { "column": 17, "line": 14 },
			"end": { "column": 18, "line": 19 }
		}
	}
];

it('FORM.HEADER_TEXT_SIZE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		assert.deepStrictEqual(actual, []);
	});

	global.linter(invalid, (actual) => {
		assert.deepStrictEqual(actual, expected);
	});
});
