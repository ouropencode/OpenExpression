const buster = require("buster");
const OE     = require("../");

buster.testCase("Symbols - Built-ins", {
    setUp: () => this.OE = new OE(),

    "true":  () => buster.assert.equals(this.OE.evaluate("true"), true),
    "TRUE":  () => buster.assert.equals(this.OE.evaluate("TRUE"), true),
    "false": () => buster.assert.equals(this.OE.evaluate("false"), false),
    "FALSE": () => buster.assert.equals(this.OE.evaluate("FALSE"), false)
});

buster.testCase("Symbols - Context", {
    setUp: () => this.OE = new OE(),

    "simple":     () => buster.assert.equals(this.OE.evaluate("my_var", { my_var: 12345 }), 12345),
    "deep":       () => buster.assert.equals(this.OE.evaluate("test.with.depth", { test: { with: { depth: 54321 }}}), 54321),
    "multi":      () => buster.assert.equals(this.OE.evaluate("my_var + other_var", { my_var: 12345, other_var: 54321}), 66666),
    "multi-deep": () => buster.assert.equals(this.OE.evaluate("test.with.depth + test.with.other", { test: { with: { depth: 54321, other: 12345 }}}), 66666),
});
