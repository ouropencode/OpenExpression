'use strict';

var _buster = require('buster');

var _buster2 = _interopRequireDefault(_buster);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OE = null;

_buster2.default.testCase("Operations - (+) Add", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "simple": function simple() {
        return _buster2.default.assert.equals(OE.evaluate("1 + 1"), 2);
    },
    "large": function large() {
        return _buster2.default.assert.equals(OE.evaluate("2147483647 + 2147483647"), 4294967294);
    },
    "float": function float() {
        return _buster2.default.assert.equals(OE.evaluate("0.56 + 0.56"), 1.12);
    }
});

_buster2.default.testCase("Operations - (-) Subtract", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "simple": function simple() {
        return _buster2.default.assert.equals(OE.evaluate("5 - 2"), 3);
    },
    "large": function large() {
        return _buster2.default.assert.equals(OE.evaluate("4294967294 - 2147483647"), 2147483647);
    },
    "float": function float() {
        return _buster2.default.assert.equals(OE.evaluate("1.6 - 0.5"), 1.1);
    }
});

_buster2.default.testCase("Operations - (*) Multiply", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "simple": function simple() {
        return _buster2.default.assert.equals(OE.evaluate("12 * 12"), 144);
    },
    "large": function large() {
        return _buster2.default.assert.equals(OE.evaluate("65535 * 65535"), 4294836225);
    },
    "float": function float() {
        return _buster2.default.assert.equals(OE.evaluate("0.12 * 3.21"), 0.3852);
    }
});

_buster2.default.testCase("Operations - (/) Divide", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "simple": function simple() {
        return _buster2.default.assert.equals(OE.evaluate("9 / 3"), 3);
    },
    "large": function large() {
        return _buster2.default.assert.equals(OE.evaluate("4294836225 / 65535"), 65535);
    },
    "float": function float() {
        return _buster2.default.assert.equals(OE.evaluate("17.408 / 3.4"), 5.12);
    }
});

_buster2.default.testCase("Operations - (&&) AND", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "true AND true": function trueANDTrue() {
        return _buster2.default.assert.equals(OE.evaluate("true && true"), true);
    },
    "true AND false": function trueANDFalse() {
        return _buster2.default.assert.equals(OE.evaluate("true && false"), false);
    },
    "false AND false": function falseANDFalse() {
        return _buster2.default.assert.equals(OE.evaluate("false && false"), false);
    }
});

_buster2.default.testCase("Operations - (||) OR", {
    setUp: function setUp() {
        return OE = new _lib2.default();
    },

    "true OR true": function trueORTrue() {
        return _buster2.default.assert.equals(OE.evaluate("true || true"), true);
    },
    "true OR false": function trueORFalse() {
        return _buster2.default.assert.equals(OE.evaluate("true || false"), true);
    },
    "false OR false": function falseORFalse() {
        return _buster2.default.assert.equals(OE.evaluate("false || false"), false);
    }
});