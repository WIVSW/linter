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


describe('Collection test', () => {
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
			},
			{
				id: 1,
				block: 'form',
				elem: 'label',
				children: [2],
				mods: {},
				mix: [],
				parentId: 0,
			},
			{
				id: 2,
				block: 'text',
				elem: null,
				children: [],
				mods: {size: 'xl'},
				mix: [],
				parentId: 1,
			},
			{
				id: 3,
				block: 'input',
				elem: null,
				children: [],
				mods: {size: 'xxl'},
				mix: [],
				parentId: 0,
			},
		];
		const actual = new BlockCollection(input).getAllItems();
		const json = (obj) => JSON.stringify(obj);

		assert.strictEqual(json(output), json(actual));
	});
});
