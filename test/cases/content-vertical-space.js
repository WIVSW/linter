const assert = require('assert');
const valid = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": ` +
			`"item", "mods": {  "space-v": "xxl" } }]
    }
}`;

const invalid = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": ` +
			`"item", "mods": {  "space-v": "xl" } }]
    }
}`;

const expected = [
	{
		'code': 'FORM.CONTENT_VERTICAL_SPACE_IS_INVALID',
		'error': 'Вертикальный внутренний отступ ' +
			'контентного элемента формы не валиден',
		'location': {
			'start': {'column': 16, 'line': 3},
			'end': {'column': 6, 'line': 8},
		},
	},
];

it('FORM.CONTENT_VERTICAL_SPACE_IS_INVALID', () => {
	global.linter(valid, (actual) => {
		const codes = actual.map((err) => err.code);
		assert.strictEqual(actual.length, 1);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_VERTICAL_SPACE_IS_INVALID'), false);
		assert.strictEqual(
			codes.includes('FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID'), true);
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
