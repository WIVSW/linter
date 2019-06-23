const assert = require('assert');
const arrayJson = `[
	{
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
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
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;
const oneElementTwoError = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": [
            {
                "block": "form",
                "elem": "content",
                "content": {
                    "block": "form",
                    "elem": "label",
                    "content": {
                        "block": "text",
                        "mods": { "size": "xs" }
                    }
                },
                "mix": [{ "block": "form", "elem": ` +
					`"item", "mods": {  "space-h": "xxl" } }]
            },
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

describe('Can recieve multiple errors', () => {
	it('Can parse array of incorrect blocks', () => {
		global.linter(arrayJson, (actual) => {
			const codes = actual.map((err) => err.code);
			assert.strictEqual(actual.length, 2);
			assert.strictEqual(
				codes.includes('FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL'), true);
			assert.strictEqual(codes.includes('TEXT.SEVERAL_H1'), true);
		});
	});

	it('Can parse multiple form incorrect blocks', () => {
		global.linter(oneElementTwoError, (actual) => {
			const codes = actual.map((err) => err.code);
			assert.strictEqual(actual.length, 3);
			assert.strictEqual(
				codes.includes('FORM.CONTENT_ITEM_INDENT_IS_INVALID'), true);
			assert.strictEqual(
				codes.includes('FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL'), true);
			assert.strictEqual(
				codes.includes('FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID'), true);
		});
	});
});