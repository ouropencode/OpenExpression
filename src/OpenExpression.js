import Lexer from 'lex';

import Tokens from './Tokens/';
import * as Precedence from './Precedence';


export default class OpenExpression {

    static evaluate(input, context = {}, deepOutput = false) {
        const parser = new OpenExpression(process.env.OPENEXPRESSION_DEBUG);
        return parser.evaluate(input, context, deepOutput);
    }

    constructor(debug) {
        this._debug_mode = debug;

        this._tokens = [];

        this._lexer = new Lexer();
        Object.values(Tokens).forEach(tokenClass => {
            const token = new tokenClass();
            this._tokens.push(token);
            this._lexer.addRule(token.pattern, input => token.parse(input));
        });
    }


	evaluate(input, context = {}, deepOutput = false) {
		return this.execute(this.shunt(this.tokenize(input)), context, deepOutput);
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

        for(let i = 0; i < tokens.length; i++) {
            tokens[i].token.shunt(tokens[i], stack, output);
	        this._debug("SHUNT:", stack);
			this._debug("OUTPS", output);
        }

        while(stack.length) {
            const token = stack.shift();
            token.token.shuntEnd(token, stack, output);
        }

        this._debug("SHUNTED:", output);
        return output;
    }

    execute(tokens, context = {}, deepOutput = false) {
		context.true  = context.TRUE  = true;
		context.false = context.FALSE = false;

        const stack = [];

		let aborted       = false;
        let aborted_value = undefined;
		const abort = (err) => {
			if(err instanceof Error)
                throw err;

            aborted       = true;
            aborted_value = err;
		};

        for(let i = 0; i < tokens.length; i++) {
            const token = tokens[i].token;
            token.operate(tokens[i], stack, context, abort);
	        this._debug("STACK:", stack, true);
			this._debug("", token.constructor.name, true);
        }

        let value = stack.pop();
        if(deepOutput == false)
            return value;

        return { value, aborted, aborted_value, stack };
    }

    addToken(token) {
		this._tokens.push(token);

		this._lexer.addRule(token.pattern, input => {
			return { token, input };
		});
	}

    _debug(prefix, tokens, simpleMode = false) {
        if(this._debug_mode != true) return;

		const space = "             ";
		prefix = space.substr(0, space.length - prefix.length) + prefix;

		if(simpleMode == true)
			return console.log(prefix, tokens);

        const inputs = [], values = [];
        tokens.forEach(token => {
            inputs.push(token.token.opcode + "(" + token.input + ")");
            values.push(token.token.opcode + (token.value ? "(" + token.value + ")" : ""));
        });

        console.log(prefix, inputs.join(', '));
        console.log(space,  values.join(', '));
    }

}
