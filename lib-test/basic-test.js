'use strict';

var _buster = require('buster');

var _buster2 = _interopRequireDefault(_buster);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OE = null;

_buster2.default.testCase("Basic - Types", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "parse integer": function parseInteger() {
        return _buster2.default.assert.equals(OE.evaluate("10"), 10);
    },
    "parse float": function parseFloat() {
        return _buster2.default.assert.equals(OE.evaluate("4.495"), 4.495);
    },
    "parse string": function parseString() {
        return _buster2.default.assert.equals(OE.evaluate("\"test\""), "test");
    },
    "parse regex - no modifiers": function parseRegexNoModifiers() {
        return _buster2.default.assert.equals(OE.evaluate("#test#").toString(), "/test/");
    },
    "parse regex - with modifiers": function parseRegexWithModifiers() {
        return _buster2.default.assert.equals(OE.evaluate("#test#gi").toString(), "/test/gi");
    }
});

_buster2.default.testCase("Basic - Static Evaluate", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "create and evaluate a simple statement": function createAndEvaluateASimpleStatement() {
        return _buster2.default.assert.equals(OE.evaluate("1 + 1", {}), 2);
    }
});

_buster2.default.testCase("Basic - Brackets", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "brackets - none": function bracketsNone() {
        return _buster2.default.assert.equals(OE.evaluate("3 + 2 * 6 - 4"), 11);
    },
    "brackets - simple": function bracketsSimple() {
        return _buster2.default.assert.equals(OE.evaluate("(3 + 2) * (6 - 4)"), 10);
    }
});