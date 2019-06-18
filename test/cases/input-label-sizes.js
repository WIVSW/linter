const assert = require('assert');
const source = `{
    "block": "form",
    "content" [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "l" }
            }
        },
        // правильно
        { "block": "input", "mods": { "size": "l" } }
        // неправильно
        { "block": "input", "mods": { "size": "s" } }
    ]
}`;

const expected = [
	{
		"code": "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
		"error": "Подписи и поля в форме должны быть одного размера",
		"location": {
			"start": { "column": 1, "line": 1 },
			"end": { "column": 2, "line": 17 }
		}
	}
];

it('FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL', () => {
	global.linter(source, (actual) => {
		assert.deepStrictEqual(actual, expected);
	});
});
