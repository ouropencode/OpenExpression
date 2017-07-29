const buster = require("buster");
const OE     = require("../");

buster.testCase("Basic - Types", {
    setUp: () => this.OE = new OE(),

    "parse integer":                () => buster.assert.equals(this.OE.evaluate("10"), 10),
    "parse float":                  () => buster.assert.equals(this.OE.evaluate("4.495"), 4.495),
    "parse string":                 () => buster.assert.equals(this.OE.evaluate("\"test\""), "test"),
    "parse regex - no modifiers":   () => buster.assert.equals(this.OE.evaluate("#test#").toString(), "/test/"),
    "parse regex - with modifiers": () => buster.assert.equals(this.OE.evaluate("#test#gi").toString(), "/test/gi")
});

buster.testCase("Basic - Brackets", {
    setUp: () => this.OE = new OE(),

    "brackets - none":   () => buster.assert.equals(this.OE.evaluate("3 + 2 * 6 - 4"), 11),
    "brackets - simple": () => buster.assert.equals(this.OE.evaluate("(3 + 2) * (6 - 4)"), 10)
});

buster.testCase("Basic - Static Evaluate", {
    "create and evaluate a simple statement": () => buster.assert.equals(OE.evaluate("1 + 1", {}), 2)
});
