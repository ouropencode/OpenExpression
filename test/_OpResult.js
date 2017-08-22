import {OpenExpression, Token, Precedence} from '../lib';

export default class OpResult extends Token {

    constructor() {
        super(/:\s*(success|warning|failure)(!)?/, Precedence.P_VALUE + 1);
    }

	shunt(token, stack, output) {
        const match = token.input.match(/:\s*(success|warning|failure)(!)?/);
        token.response_code  = match[1];
        token.response_final = match[2] == "!";
        super.shunt(token, stack, output);
	}

    operate(token, stack, context, abort) {
		const a = stack.pop();
        if(a == false) return stack.push(false);

        stack.push(token.response_code);
        if(token.response_final) abort();
    }

}
