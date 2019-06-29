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

it('FORM.FOOTER_TEXT_SIZE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(
			codes.includes('FORM.FOOTER_TEXT_SIZE_IS_INVALID'), false);
	});

	global.linter(invalid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(
			codes.includes('FORM.FOOTER_TEXT_SIZE_IS_INVALID'), true);
	});
});
