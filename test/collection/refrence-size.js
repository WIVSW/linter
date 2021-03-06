const assert = require('assert');
const esprima = require('esprima');
const BlockCollection = require('../../src/collections/block.js');

const createAst = (json) =>
	esprima.parseScript(
		`(${JSON.stringify(json, null, 4)})`,
		{loc: true}
	);

const loopCollection = (collection, extected) => collection
	.getAllItems()
	.forEach((block) => {
		const refrence = collection.getRefrenceTextSize(block);
		assert.strictEqual(refrence, extected);
	});

const simpleAst = createAst(require('./_data/refrence/simple.json'));
const headerAst = createAst(require('./_data/refrence/header.json'));
const oneLevelAst = createAst(require('./_data/refrence/one-level.json'));
const withoutFormAst = createAst(require('./_data/refrence/without-form.json'));
const withFormButWithoutTextBlocksAst =
	createAst(require('./_data/refrence/with-form-but-without-text-blocks.json'));

describe('Calculation of refrence size should work right...', () => {
	it('with simple form', () => {
		loopCollection(new BlockCollection(simpleAst), null);
	});

	it('with header form', () => {
		loopCollection(new BlockCollection(headerAst), 'l');
	});

	it('on same level', () => {
		loopCollection(new BlockCollection(oneLevelAst), null);
	});

	it('without form', () => {
		loopCollection(new BlockCollection(withoutFormAst), null);
	});

	it('with form but without text blocks', () => {
		loopCollection(new BlockCollection(withFormButWithoutTextBlocksAst), null);
	});
});
