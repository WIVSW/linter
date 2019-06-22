const assert = require('assert');
const valid = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl" } }]
    }
}`;

const invalid = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xxl" } }]
    }
}`;

const expected = [
	{
		"code": "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
		"error": "Горизонтальный внутренний отступ контентного элемента формы не валиден",
		"location": {
			"start": { "column": 16, "line": 3 },
			"end": { "column": 6, "line": 8 }
		}
	}
];

it('FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		assert.deepStrictEqual(actual, []);
	});

	global.linter(invalid, (actual) => {
		assert.deepStrictEqual(actual, expected);
	});
});
