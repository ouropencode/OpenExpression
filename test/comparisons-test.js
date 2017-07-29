const buster = require("buster");
const OE     = require("../");

buster.testCase("Comparisons - (==) Equal", {
    setUp: () => this.OE = new OE(),

    "is equal":     () => buster.assert.equals(this.OE.evaluate("15 == 15"), true),
    "is not equal": () => buster.assert.equals(this.OE.evaluate("15 == 20"), false)
});

buster.testCase("Comparisons - (>) Greater Than", {
    setUp: () => this.OE = new OE(),

    "is greater than":     () => buster.assert.equals(this.OE.evaluate("20 > 15"), true),
    "is not greater than": () => buster.assert.equals(this.OE.evaluate("15 > 20"), false)
});

buster.testCase("Comparisons - (>=) Greater Than Or Equal", {
    setUp: () => this.OE = new OE(),

    "is equal":            () => buster.assert.equals(this.OE.evaluate("20 >= 20"), true),
    "is greater than":     () => buster.assert.equals(this.OE.evaluate("20 >= 15"), true),
    "is not greater than": () => buster.assert.equals(this.OE.evaluate("15 >= 20"), false)
});

buster.testCase("Comparisons - (>) Less Than", {
    setUp: () => this.OE = new OE(),

    "is less than":     () => buster.assert.equals(this.OE.evaluate("15 < 20"), true),
    "is not less than": () => buster.assert.equals(this.OE.evaluate("20 < 15"), false)
});

buster.testCase("Comparisons - (>=) Less Than Or Equal", {
    setUp: () => this.OE = new OE(),

    "is equal":         () => buster.assert.equals(this.OE.evaluate("20 <= 20"), true),
    "is less than":     () => buster.assert.equals(this.OE.evaluate("15 <= 20"), true),
    "is not less than": () => buster.assert.equals(this.OE.evaluate("20 <= 15"), false)
});

buster.testCase("Comparisons - (~=) RegExp Match", {
    setUp: () => this.OE = new OE(),

    "matches without modifiers":       () => buster.assert.equals(this.OE.evaluate("\"our test string\" ~= #test#"), true),
    "doesn't match without modifiers": () => buster.assert.equals(this.OE.evaluate("\"our fail string\" ~= #test#"), false),
    "matches with modifiers":          () => buster.assert.equals(this.OE.evaluate("\"our test string\" ~= #TEST#i"), true),
    "doesn't match with modifiers":    () => buster.assert.equals(this.OE.evaluate("\"our fail string\" ~= #TEST#i"), false)
});
