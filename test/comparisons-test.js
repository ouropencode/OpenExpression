import buster from 'buster';
import OpenExpression from '../lib';

let OE = null;

buster.testCase("Comparisons - (==) Equal", {
    setUp: () => OE = new OpenExpression(),

	"is not equal": () => buster.assert.equals(OE.evaluate("15 == 20"), false),
    "is equal":     () => buster.assert.equals(OE.evaluate("15 == 15"), true),
});

buster.testCase("Comparisons - (>) Greater Than", {
    setUp: () => OE = new OpenExpression(),

    "is greater than":     () => buster.assert.equals(OE.evaluate("20 > 15"), true),
    "is not greater than": () => buster.assert.equals(OE.evaluate("15 > 20"), false)
});

buster.testCase("Comparisons - (>=) Greater Than Or Equal", {
    setUp: () => OE = new OpenExpression(),

    "is equal":            () => buster.assert.equals(OE.evaluate("20 >= 20"), true),
    "is greater than":     () => buster.assert.equals(OE.evaluate("20 >= 15"), true),
    "is not greater than": () => buster.assert.equals(OE.evaluate("15 >= 20"), false)
});

buster.testCase("Comparisons - (>) Less Than", {
    setUp: () => OE = new OpenExpression(),

    "is less than":     () => buster.assert.equals(OE.evaluate("15 < 20"), true),
    "is not less than": () => buster.assert.equals(OE.evaluate("20 < 15"), false)
});

buster.testCase("Comparisons - (>=) Less Than Or Equal", {
    setUp: () => OE = new OpenExpression(),

    "is equal":         () => buster.assert.equals(OE.evaluate("20 <= 20"), true),
    "is less than":     () => buster.assert.equals(OE.evaluate("15 <= 20"), true),
    "is not less than": () => buster.assert.equals(OE.evaluate("20 <= 15"), false)
});

buster.testCase("Comparisons - (~=) RegExp Match", {
    setUp: () => OE = new OpenExpression(),

    "matches without modifiers":       () => buster.assert.equals(OE.evaluate("\"our test string\" ~= #test#"), true),
    "doesn't match without modifiers": () => buster.assert.equals(OE.evaluate("\"our fail string\" ~= #test#"), false),
    "matches with modifiers":          () => buster.assert.equals(OE.evaluate("\"our test string\" ~= #TEST#i"), true),
    "doesn't match with modifiers":    () => buster.assert.equals(OE.evaluate("\"our fail string\" ~= #TEST#i"), false),

	"matches plain string comparison":       () => buster.assert.equals(OE.evaluate("\"our test string\" ~= \"test\""), true),
	"doesn't match plain string comparison": () => buster.assert.equals(OE.evaluate("\"our fail string\" ~= \"test\""), false)
});
