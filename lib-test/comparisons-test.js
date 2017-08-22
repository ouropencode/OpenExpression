'use strict';

var _buster = require('buster');

var _buster2 = _interopRequireDefault(_buster);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OE = null;

_buster2.default.testCase("Comparisons - (==) Equal", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "is not equal": function isNotEqual() {
        return _buster2.default.assert.equals(OE.evaluate("15 == 20"), false);
    },
    "is equal": function isEqual() {
        return _buster2.default.assert.equals(OE.evaluate("15 == 15"), true);
    }
});

_buster2.default.testCase("Comparisons - (>) Greater Than", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "is greater than": function isGreaterThan() {
        return _buster2.default.assert.equals(OE.evaluate("20 > 15"), true);
    },
    "is not greater than": function isNotGreaterThan() {
        return _buster2.default.assert.equals(OE.evaluate("15 > 20"), false);
    }
});

_buster2.default.testCase("Comparisons - (>=) Greater Than Or Equal", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "is equal": function isEqual() {
        return _buster2.default.assert.equals(OE.evaluate("20 >= 20"), true);
    },
    "is greater than": function isGreaterThan() {
        return _buster2.default.assert.equals(OE.evaluate("20 >= 15"), true);
    },
    "is not greater than": function isNotGreaterThan() {
        return _buster2.default.assert.equals(OE.evaluate("15 >= 20"), false);
    }
});

_buster2.default.testCase("Comparisons - (>) Less Than", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "is less than": function isLessThan() {
        return _buster2.default.assert.equals(OE.evaluate("15 < 20"), true);
    },
    "is not less than": function isNotLessThan() {
        return _buster2.default.assert.equals(OE.evaluate("20 < 15"), false);
    }
});

_buster2.default.testCase("Comparisons - (>=) Less Than Or Equal", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "is equal": function isEqual() {
        return _buster2.default.assert.equals(OE.evaluate("20 <= 20"), true);
    },
    "is less than": function isLessThan() {
        return _buster2.default.assert.equals(OE.evaluate("15 <= 20"), true);
    },
    "is not less than": function isNotLessThan() {
        return _buster2.default.assert.equals(OE.evaluate("20 <= 15"), false);
    }
});

_buster2.default.testCase("Comparisons - (~=) RegExp Match", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "matches without modifiers": function matchesWithoutModifiers() {
        return _buster2.default.assert.equals(OE.evaluate("\"our test string\" ~= #test#"), true);
    },
    "doesn't match without modifiers": function doesnTMatchWithoutModifiers() {
        return _buster2.default.assert.equals(OE.evaluate("\"our fail string\" ~= #test#"), false);
    },
    "matches with modifiers": function matchesWithModifiers() {
        return _buster2.default.assert.equals(OE.evaluate("\"our test string\" ~= #TEST#i"), true);
    },
    "doesn't match with modifiers": function doesnTMatchWithModifiers() {
        return _buster2.default.assert.equals(OE.evaluate("\"our fail string\" ~= #TEST#i"), false);
    }
});