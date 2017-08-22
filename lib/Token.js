"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {
	function Token(pattern, precedence) {
		_classCallCheck(this, Token);

		if (this.constructor == Token) throw new Error("cannot instantiate abstract Token class");

		this.opcode = this.constructor.name;
		this.pattern = pattern;
		this.precedence = precedence;
	}

	_createClass(Token, [{
		key: "parse",
		value: function parse(input) {
			return {
				token: this,
				input: input
			};
		}
	}, {
		key: "shunt",
		value: function shunt(token, stack, output) {
			while (stack.length) {
				var punctuator = stack[0];

				if (punctuator.token.opcode == "BracketLeft") break;

				var precedence = token.token.precedence;
				var antecedence = punctuator.token.precedence;

				if (precedence > antecedence || precedence == antecedence && token.associativity == "right") break;

				output.push(stack.shift());
			}

			stack.unshift(token);
		}
	}, {
		key: "shuntEnd",
		value: function shuntEnd(token, stack, output) {
			output.push(token);
		}
	}, {
		key: "operate",
		value: function operate(token, stack, context, abort) {}
	}, {
		key: "toString",
		value: function toString() {
			return this.opcode;
		}
	}]);

	return Token;
}();

exports.default = Token;