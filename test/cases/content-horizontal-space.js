const assert = require('assert');
const valid = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": ` +
			`"item", "mods": {  "space-h": "xl" } }]
    }
}`;

const invalid = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": ` +
			`"item", "mods": {  "space-h": "xxl" } }]
    }
}`;

it('FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(actual.length, 1);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_VERTICAL_SPACE_IS_INVALID'), true);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID'), false);
	});

	global.linter(invalid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(actual.length, 2);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_VERTICAL_SPACE_IS_INVALID'), true);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID'), true);
	});
});
