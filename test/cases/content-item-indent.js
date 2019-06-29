const assert = require('assert');
const valid = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": [
            {
                "block": "form",
                "elem":  "content-item",
                "mix": [{ "block": "form", "elem": ` +
					`"item", "mods": { "indent-b": "xl" } }],
                "mods": { "indent-b": "xl" },
                "content": { "block": "input", "mods": { "size": "l" } }
            },
            {
                "block": "form",
                "elem":  "content-item",
                "content": { "block": "input", "mods": { "size": "l" } }
            }
        ]
    }
}`;

const invalid = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": [
            {
                "block": "form",
                "elem":  "content-item",
                "mix": [{ "block": "form", "elem": ` +
					`"item", "mods": { "indent-b": "l" } }],
                "content": { "block": "input", "mods": { "size": "l" } }
            },
            {
                "block": "form",
                "elem":  "content-item",
                "content": { "block": "input", "mods": { "size": "l" } }
            }
        ]
    }
}`;

const json = (json) => JSON.stringify(json, null, 4);
const single = json(require('./_data/content-item-indent/single-invalid.json'));
const two = json(require('./_data/content-item-indent/two-invalid.json'));

it('FORM.CONTENT_ITEM_INDENT_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_ITEM_INDENT_IS_INVALID'), false);
	});

	global.linter(invalid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_ITEM_INDENT_IS_INVALID'), true);
	});

	global.linter(single, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_ITEM_INDENT_IS_INVALID'), true);
	});

	global.linter(two, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_ITEM_INDENT_IS_INVALID'), true);
	});
});
