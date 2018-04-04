import buster from 'buster';
import OpenExpression from '../lib';

let OE = null;

buster.testCase("Symbols - Built-ins", {
    setUp: () => OE = new OpenExpression(),

    "true":  () => buster.assert.equals(OE.evaluate("true"), true),
    "TRUE":  () => buster.assert.equals(OE.evaluate("TRUE"), true),
    "false": () => buster.assert.equals(OE.evaluate("false"), false),
    "FALSE": () => buster.assert.equals(OE.evaluate("FALSE"), false)
});

buster.testCase("Symbols - Context", {
    setUp: () => OE = new OpenExpression(),

    "simple":           () => buster.assert.equals(OE.evaluate("my_var_32", { my_var_32: 12345 }), 12345),
		"simple (hypen)":   () => buster.assert.equals(OE.evaluate("my-var-32", { "my-var-32": 12345 }), 12345),
		"underscore":       () => buster.assert.equals(OE.evaluate("_", { "_": 12345 }), 12345),
		"underscore start": () => buster.assert.equals(OE.evaluate("_underscore", { "_underscore": 12345 }), 12345),
    "deep":             () => buster.assert.equals(OE.evaluate("test.with.depth", { test: { with: { depth: 54321 }}}), 54321),
    "multi":            () => buster.assert.equals(OE.evaluate("my_var + other_var", { my_var: 12345, other_var: 54321}), 66666),
    "multi + deep":     () => buster.assert.equals(OE.evaluate("test.with.depth + test.with.other", { test: { with: { depth: 54321, other: 12345 }}}), 66666),
});
