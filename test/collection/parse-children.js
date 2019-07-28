const assert = require('assert');
const esprima = require('esprima');

const BlockCollection = require('../../src/collections/block');

const source = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "xl" }
            }
        },
        {
            "block": "input",
            "mods": { "size": "xxl" }
        }
    ]
}`;

it('Should correctly parse block collection with children', () => {
	const input = esprima.parseScript(`(${source})`, {loc: true});
	const output = [
		{
			id: 0,
			block: 'form',
			elem: null,
			children: [1, 3],
			mods: {},
			mix: [],
			parentId: null,
			location: {
				start: {
					column: 1,
					line: 1,
				},
				end: {
					column: 2,
					line: 17,
				},
			},
		},
		{
			id: 1,
			block: 'form',
			elem: 'label',
			children: [2],
			mods: {},
			mix: [],
			parentId: 0,
			location: {
				start: {
					column: 9,
					line: 4,
				},
				end: {
					column: 10,
					line: 11,
				},
			},
		},
		{
			id: 2,
			block: 'text',
			elem: null,
			children: [],
			mods: {size: 'xl'},
			mix: [],
			parentId: 1,
			location: {
				start: {
					column: 24,
					line: 7,
				},
				end: {
					column: 14,
					line: 10,
				},
			},
		},
		{
			id: 3,
			block: 'input',
			elem: null,
			children: [],
			mods: {size: 'xxl'},
			mix: [],
			parentId: 0,
			location: {
				start: {
					column: 9,
					line: 12,
				},
				end: {
					column: 10,
					line: 15,
				},
			},
		},
	];
	const actual = new BlockCollection(input).getAllItems();
	const json = (obj) => JSON.stringify(obj);

	assert.strictEqual(json(output), json(actual));
});
