"use strict";
const Lexer = require('lex');

const Precedence = {};
Precedence.P_ZERO    = 0,
Precedence.P_BRACKET = 10,
Precedence.P_MOD     = 20,
Precedence.P_COMP    = 30,
Precedence.P_TERM    = 40,
Precedence.P_FACTOR  = 50;

module.exports = class OpenExpression {

    static evaluate(input, context) {
        const parser = new OpenExpression(process.env.DEBUG);
        return parser.evaluate(input, context);
    }

    constructor(debug) {
        this._debug_mode = debug;

        this._tokens = [
            {opcode: "WHITESPACE",    pattern: /\s+/,                  precedence: Precedence.P_ZERO},
            {opcode: "VALUE_INTEGER", pattern: /[0-9]+/,               precedence: Precedence.P_ZERO},
            {opcode: "VALUE_FLOAT",   pattern: /[0-9]+(\.[0-9]+)?/,    precedence: Precedence.P_ZERO},
            {opcode: "VALUE_STRING",  pattern: /"[^"]+"/,              precedence: Precedence.P_ZERO},
            {opcode: "VALUE_REGEX",   pattern: /#[^/]+#([a-zA-Z]+)?/,  precedence: Precedence.P_ZERO},
            {opcode: "SYMBOL",        pattern: /[a-zA-Z._]+/,          precedence: Precedence.P_ZERO},
            {opcode: "BRACKET_LEFT",  pattern: /\(/,                   precedence: Precedence.P_BRACKET},
            {opcode: "BRACKET_RIGHT", pattern: /\)/,                   precedence: Precedence.P_BRACKET},
            {opcode: "OP_ADD",        pattern: /\+/,                   precedence: Precedence.P_TERM,    operator: (t, a, b) => a + b},
            {opcode: "OP_SUBTRACT",   pattern: /-/,                    precedence: Precedence.P_TERM,    operator: (t, a, b) => a - b},
            {opcode: "OP_MULTIPLY",   pattern: /\*/,                   precedence: Precedence.P_FACTOR,  operator: (t, a, b) => a * b},
            {opcode: "OP_DIVIDE",     pattern: /\//,                   precedence: Precedence.P_FACTOR,  operator: (t, a, b) => a / b},
            {opcode: "OP_EQ",         pattern: /==/,                   precedence: Precedence.P_COMP,    operator: (t, a, b) => a == b},
            {opcode: "OP_NE",         pattern: /!=/,                   precedence: Precedence.P_COMP,    operator: (t, a, b) => a != b},
            {opcode: "OP_GTE",        pattern: />=/,                   precedence: Precedence.P_COMP,    operator: (t, a, b) => a >= b},
            {opcode: "OP_GT",         pattern: />/,                    precedence: Precedence.P_COMP,    operator: (t, a, b) => a > b},
            {opcode: "OP_LTE",        pattern: /<=/,                   precedence: Precedence.P_COMP,    operator: (t, a, b) => a <= b},
            {opcode: "OP_LT",         pattern: /</,                    precedence: Precedence.P_COMP,    operator: (t, a, b) => a < b},
            {opcode: "OP_REGEX",      pattern: /~=/,                   precedence: Precedence.P_COMP,    operator: (t, a, b) => b.test(a)},
            {opcode: "OP_AND",        pattern: /&&/,                   precedence: Precedence.P_MOD,     operator: (t, a, b) => a && b},
            {opcode: "OP_OR",         pattern: /\|\|/,                 precedence: Precedence.P_MOD,     operator: (t, a, b) => a || b}
        ];

        this._lexer = new Lexer();
        for(let i = 0; i < this._tokens.length; i++) {
            let token = this._tokens[i];

            this._lexer.addRule(token.pattern, input => {
                if(token.opcode == "WHITESPACE") return;
                return { token, input };
            });
        }
    }


	evaluate(input, context = {}) {
		return this.execute(this.shunt(this.tokenize(input)), context);
	}

    tokenize(input) {
        this._lexer.setInput(input);

        const tokens = [];
        let token;
        while(token = this._lexer.lex())
            tokens.push(token);

        this._debug("TOKENS:", tokens);
        return tokens;
    }

    shunt(tokens) {
        const output = [];
        const stack  = [];

        let index = 0;
        while(index < tokens.length) {
            let token  = tokens[index];
            let opcode = tokens[index].token.opcode;
            let input  = tokens[index].input;
            index++;

            switch(opcode) {
                case "BRACKET_LEFT":
                    stack.unshift(token);
                    break;

                case "BRACKET_RIGHT":
                    let prevToken = null;

                    while(stack.length) {
                        prevToken = stack.shift();
                        if(prevToken.token.opcode == "BRACKET_LEFT") break;
                        output.push(prevToken);
                    }

                    if(!prevToken || prevToken.token.opcode != "BRACKET_LEFT")
                        throw new Error("shunt error: mismatched parentheses.");

                    break;

                case "VALUE_FLOAT":
                    token.value = parseFloat(input);
                    output.push(token);
                    break;

                case "VALUE_INTEGER":
                    token.value = parseInt(input, 10);
                    output.push(token);
                    break;

                case "VALUE_STRING":
                    token.value = input.substr(1, input.length - 2);
                    output.push(token);
                    break;

                case "VALUE_REGEX":
                    const match = input.match(/#([^/]+)#([a-zA-Z]+)?/);
                    token.value = new RegExp(match[1], match[2]);
                    output.push(token);
                    break;

                case "SYMBOL":
                    token.value = input.split('.');
                    output.push(token);
                    break;

                default:
                    while(stack.length) {
                        let punctuator = stack[0];
                        if(punctuator.token.opcode == "BRACKET_LEFT") break;

                        let precedence   = token.token.precedence;
                        let antecedence = punctuator.token.precedence;

                        if(precedence > antecedence || precedence == antecedence && token.associativity == "right")
                            break;

                        output.push(stack.shift());
                    }

                    stack.unshift(token);
                    break;
            }
        }

        while(stack.length) {
            let token = stack.shift();

            if(token.token.opcode == "BRACKET_LEFT")
                throw new Error("shunt error: mismatched parentheses.")

            output.push(token);
        }

        this._debug("SHUNTED:", output);
        return output;
    }

    execute(tokens, context = {}) {
        let stack  = [];
        let final_result = undefined;

        context.true = context.TRUE = true;
        context.false = context.FALSE = false;

        for(let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const opcode = token.token.opcode;

            switch(token.token.opcode) {
                case "SYMBOL":
                    const path = token.value;
                    let value = context[path[0]];
                    for(let i = 1; i < path.length; i++) {
                        if(typeof value != 'object') {
                            stack.push(undefined);
                            break;
                        }

                        value = value[path[i]];
                    }

                    stack.push(value);
                    break;

                default:
                    const operator = token.token.operator;
                    if(!operator) {
                        stack.push(token.value);
                        break;
                    }

					let stackPop = [];
					for(let i = 0; i < operator.length - 1; i++)
						stackPop.push(stack.pop());
                    stackPop.push(token);

                    stack.push(operator.apply(this, stackPop.reverse()));
                    break;
            }
        };

        return stack.pop();
    }

    addToken(token) {
		this._tokens.push(token);

		this._lexer.addRule(token.pattern, input => {
			if(token.opcode == "WHITESPACE") return;
			return { token, input };
		});
	}

    _debug(prefix, tokens) {
        if(this._debug_mode != true) return;

        const inputs = [], values = [];
        tokens.forEach(token => {
            inputs.push(token.token.opcode + "(" + token.input + ")");
            values.push(token.token.opcode + (token.value ? "(" + token.value + ")" : ""));
        });

        const space = "             ";
        prefix = space.substr(0, space.length - prefix.length) + prefix;
        console.log(prefix, inputs.join(', '));
        console.log(space,  values.join(', '));
    }

};

module.exports.Precedence = Precedence;
