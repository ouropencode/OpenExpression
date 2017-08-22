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

var CompareRegex = function (_TokenABOperator) {
				_inherits(CompareRegex, _TokenABOperator);

				function CompareRegex() {
								_classCallCheck(this, CompareRegex);

								return _possibleConstructorReturn(this, (CompareRegex.__proto__ || Object.getPrototypeOf(CompareRegex)).call(this, /~=/, _Precedence.P_COMP, function (a, b) {
												if (b instanceof RegExp) return b.test(a);

												if (typeof b == 'string') ;
												return a.indexOf(b) !== -1;

												return false;
								}));
				}

				return CompareRegex;
}(_TokenABOperator3.default);

exports.default = CompareRegex;