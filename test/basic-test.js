import buster from 'buster';
import OpenExpression from '../lib';

let OE = null;

buster.testCase("Basic - Types", {
    setUp: () => OE = new OpenExpression(),

    "parse integer":                () => buster.assert.equals(OE.evaluate("10"), 10),
    "parse float":                  () => buster.assert.equals(OE.evaluate("4.495"), 4.495),
    "parse string":                 () => buster.assert.equals(OE.evaluate("\"test\""), "test"),
    "parse regex - no modifiers":   () => buster.assert.equals(OE.evaluate("#test#").toString(), "/test/"),
    "parse regex - with modifiers": () => buster.assert.equals(OE.evaluate("#test#gi").toString(), "/test/gi")
});

buster.testCase("Basic - Static Evaluate", {
    setUp: () => OE = new OpenExpression(),

    "create and evaluate a simple statement": () => buster.assert.equals(OE.evaluate("1 + 1", {}), 2)
});

buster.testCase("Basic - Brackets", {
    setUp: () => OE = new OpenExpression(),

    "brackets - none":   () => buster.assert.equals(OE.evaluate("3 + 2 * 6 - 4"), 11),
    "brackets - simple": () => buster.assert.equals(OE.evaluate("(3 + 2) * (6 - 4)"), 10)
});
