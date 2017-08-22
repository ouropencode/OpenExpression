'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lex = require('lex');

var _lex2 = _interopRequireDefault(_lex);

var _Tokens = require('./Tokens/');

var _Tokens2 = _interopRequireDefault(_Tokens);

var _Precedence = require('./Precedence');

var Precedence = _interopRequireWildcard(_Precedence);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpenExpression = function () {
    _createClass(OpenExpression, null, [{
        key: 'evaluate',
        value: function evaluate(input) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var deepOutput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var parser = new OpenExpression(process.env.OPENEXPRESSION_DEBUG);
            return parser.evaluate(input, context, deepOutput);
        }
    }]);

    function OpenExpression(debug) {
        var _this = this;

        _classCallCheck(this, OpenExpression);

        this._debug_mode = debug;

        this._tokens = [];

        this._lexer = new _lex2.default();
        Object.values(_Tokens2.default).forEach(function (tokenClass) {
            var token = new tokenClass();
            _this._tokens.push(token);
            _this._lexer.addRule(token.pattern, function (input) {
                return token.parse(input);
            });
        });
    }

    _createClass(OpenExpression, [{
        key: 'evaluate',
        value: function evaluate(input) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var deepOutput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return this.execute(this.shunt(this.tokenize(input)), context, deepOutput);
        }
    }, {
        key: 'tokenize',
        value: function tokenize(input) {
            this._lexer.setInput(input);

            var tokens = [];
            var token = void 0;
            while (token = this._lexer.lex()) {
                tokens.push(token);
            }this._debug("TOKENS:", tokens);
            return tokens;
        }
    }, {
        key: 'shunt',
        value: function shunt(tokens) {
            var output = [];
            var stack = [];

            for (var i = 0; i < tokens.length; i++) {
                tokens[i].token.shunt(tokens[i], stack, output);
            }while (stack.length) {
                var token = stack.shift();
                token.token.shuntEnd(token, stack, output);
            }

            this._debug("SHUNTED:", output);
            return output;
        }
    }, {
        key: 'execute',
        value: function execute(tokens) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var deepOutput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            context.true = context.TRUE = true;
            context.false = context.FALSE = false;

            var stack = [];

            var aborted = false;
            var aborted_value = undefined;
            var abort = function abort(err) {
                if (err instanceof Error) throw err;

                aborted = true;
                aborted_value = err;
            };

            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i].token;
                token.operate(tokens[i], stack, context, abort);
                this._debug("STACK:", stack, true);
                this._debug("", token.constructor.name, true);
            }

            var value = stack.pop();
            if (deepOutput == false) return value;

            return { value: value, aborted: aborted, aborted_value: aborted_value, stack: stack };
        }
    }, {
        key: 'addToken',
        value: function addToken(token) {
            this._tokens.push(token);

            this._lexer.addRule(token.pattern, function (input) {
                return { token: token, input: input };
            });
        }
    }, {
        key: '_debug',
        value: function _debug(prefix, tokens) {
            var simpleMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (this._debug_mode != true) return;

            var space = "             ";
            prefix = space.substr(0, space.length - prefix.length) + prefix;

            if (simpleMode == true) return console.log(prefix, tokens);

            var inputs = [],
                values = [];
            tokens.forEach(function (token) {
                inputs.push(token.token.opcode + "(" + token.input + ")");
                values.push(token.token.opcode + (token.value ? "(" + token.value + ")" : ""));
            });

            console.log(prefix, inputs.join(', '));
            console.log(space, values.join(', '));
        }
    }]);

    return OpenExpression;
}();

exports.default = OpenExpression;