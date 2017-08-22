"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lib = require("../lib");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OpResult = function (_Token) {
    _inherits(OpResult, _Token);

    function OpResult() {
        _classCallCheck(this, OpResult);

        return _possibleConstructorReturn(this, (OpResult.__proto__ || Object.getPrototypeOf(OpResult)).call(this, /:\s*(success|warning|failure)(!)?/, _lib.Precedence.P_VALUE + 1));
    }

    _createClass(OpResult, [{
        key: "shunt",
        value: function shunt(token, stack, output) {
            var match = token.input.match(/:\s*(success|warning|failure)(!)?/);
            token.response_code = match[1];
            token.response_final = match[2] == "!";
            _get(OpResult.prototype.__proto__ || Object.getPrototypeOf(OpResult.prototype), "shunt", this).call(this, token, stack, output);
        }
    }, {
        key: "operate",
        value: function operate(token, stack, context, abort) {
            var a = stack.pop();
            if (a == false) return stack.push(false);

            stack.push(token.response_code);
            if (token.response_final) abort();
        }
    }]);

    return OpResult;
}(_lib.Token);

exports.default = OpResult;