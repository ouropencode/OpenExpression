'use strict';

var _buster = require('buster');

var _buster2 = _interopRequireDefault(_buster);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OE = null;

_buster2.default.testCase("Symbols - Built-ins", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "true": function _true() {
        return _buster2.default.assert.equals(OE.evaluate("true"), true);
    },
    "TRUE": function TRUE() {
        return _buster2.default.assert.equals(OE.evaluate("TRUE"), true);
    },
    "false": function _false() {
        return _buster2.default.assert.equals(OE.evaluate("false"), false);
    },
    "FALSE": function FALSE() {
        return _buster2.default.assert.equals(OE.evaluate("FALSE"), false);
    }
});

_buster2.default.testCase("Symbols - Context", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "simple": function simple() {
        return _buster2.default.assert.equals(OE.evaluate("my_var_32", { my_var_32: 12345 }), 12345);
    },
    "simple (hypen)": function simpleHypen() {
        return _buster2.default.assert.equals(OE.evaluate("my-var-32", { "my-var-32": 12345 }), 12345);
    },
    "underscore": function underscore() {
        return _buster2.default.assert.equals(OE.evaluate("_", { "_": 12345 }), 12345);
    },
    "underscore start": function underscoreStart() {
        return _buster2.default.assert.equals(OE.evaluate("_underscore", { "_underscore": 12345 }), 12345);
    },
    "deep": function deep() {
        return _buster2.default.assert.equals(OE.evaluate("test.with.depth", { test: { with: { depth: 54321 } } }), 54321);
    },
    "multi": function multi() {
        return _buster2.default.assert.equals(OE.evaluate("my_var + other_var", { my_var: 12345, other_var: 54321 }), 66666);
    },
    "multi + deep": function multiDeep() {
        return _buster2.default.assert.equals(OE.evaluate("test.with.depth + test.with.other", { test: { with: { depth: 54321, other: 12345 } } }), 66666);
    }
});