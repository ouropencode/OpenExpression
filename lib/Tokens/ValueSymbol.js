'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TokenValue2 = require('../TokenValue');

var _TokenValue3 = _interopRequireDefault(_TokenValue2);

var _Precedence = require('../Precedence');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValueSymbol = function (_TokenValue) {
    _inherits(ValueSymbol, _TokenValue);

    function ValueSymbol() {
        _classCallCheck(this, ValueSymbol);

        return _possibleConstructorReturn(this, (ValueSymbol.__proto__ || Object.getPrototypeOf(ValueSymbol)).call(this, /[a-zA-Z_]+[a-zA-Z0-9._-]*/, _Precedence.P_VALUE));
    }

    _createClass(ValueSymbol, [{
        key: 'shunt',
        value: function shunt(token, stack, output) {
            token.value = token.input.split('.');
            output.push(token);
        }
    }, {
        key: 'operate',
        value: function operate(token, stack, context) {
            var path = token.value;

            var value = context[path[0]];
            for (var i = 1; i < path.length; i++) {
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) != 'object') return stack.push(undefined);

                value = value[path[i]];
            }

            stack.push(value);
        }
    }]);

    return ValueSymbol;
}(_TokenValue3.default);

exports.default = ValueSymbol;