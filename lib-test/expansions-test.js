'use strict';

var _buster = require('buster');

var _buster2 = _interopRequireDefault(_buster);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

var _OpResult = require('./_OpResult.js');

var _OpResult2 = _interopRequireDefault(_OpResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OE = null;

_buster2.default.testCase("Expansions - Additional Token", {
    setUp: function setUp() {
        OE = new _lib2.default();
        OE.addToken(new _OpResult2.default());
    },

    "result opcode - success": function resultOpcodeSuccess() {
        return _buster2.default.assert.equals(OE.evaluate("true: success"), "success");
    },
    "result opcode - warning": function resultOpcodeWarning() {
        return _buster2.default.assert.equals(OE.evaluate("true: warning"), "warning");
    },
    "result opcode - failure": function resultOpcodeFailure() {
        return _buster2.default.assert.equals(OE.evaluate("true: failure"), "failure");
    },
    "result opcode - blank": function resultOpcodeBlank() {
        return _buster2.default.assert.equals(OE.evaluate("false: success"), false);
    },

    "result opcode - final": function resultOpcodeFinal() {
        var response = OE.evaluate("true: success!", {}, true);

        _buster2.default.assert.equals(response.value, "success");
        _buster2.default.assert.equals(response.aborted, true);
        _buster2.default.assert.equals(response.aborted_value, undefined);
        _buster2.default.assert.equals(response.stack, []);
    },

    "result opcode - complex": function resultOpcodeComplex() {
        var response = OE.evaluate("(source.ip == \"192.168.0.1\" && source.port == 7777) || (date.year > 2018): warning!", {
            source: { ip: "192.168.0.1", port: 7777 },
            date: { year: 2018 }
        }, true);

        _buster2.default.assert.equals(response.value, "warning");
        _buster2.default.assert.equals(response.aborted, true);
        _buster2.default.assert.equals(response.aborted_value, undefined);
        _buster2.default.assert.equals(response.stack, []);
    },

    "result opcode - complex 2": function resultOpcodeComplex2() {
        var response = OE.evaluate("response.code != 200 && response.code != 401: failure!", {
            response: { code: "401" }
        }, true);

        _buster2.default.assert.equals(response.value, "failure");
        _buster2.default.assert.equals(response.aborted, true);
        _buster2.default.assert.equals(response.aborted_value, undefined);
        _buster2.default.assert.equals(response.stack, []);
    }

});