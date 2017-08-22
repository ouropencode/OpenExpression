'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TokenABOperator2 = require('../TokenABOperator');

var _TokenABOperator3 = _interopRequireDefault(_TokenABOperator2);

var _Precedence = require('../Precedence');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OpOr = function (_TokenABOperator) {
    _inherits(OpOr, _TokenABOperator);

    function OpOr() {
        _classCallCheck(this, OpOr);

        return _possibleConstructorReturn(this, (OpOr.__proto__ || Object.getPrototypeOf(OpOr)).call(this, /\|\|/, _Precedence.P_BOOL, function (a, b) {
            return !!(a || b);
        }));
    }

    return OpOr;
}(_TokenABOperator3.default);

exports.default = OpOr;