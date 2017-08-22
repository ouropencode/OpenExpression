import Token from '../Token';
import {P_BRACKET} from '../Precedence';

export default class BracketRight extends Token {

    constructor() {
        super(/\)/, P_BRACKET);
    }

	shunt(token, stack, output) {
        let prevToken = null;

        while(stack.length) {
            prevToken = stack.shift();
            if(prevToken.token.opcode == "BracketLeft") break;
            output.push(prevToken);
        }

        if(!prevToken || prevToken.token.opcode != "BracketLeft")
            throw new Error("shunt error: mismatched parentheses.");
	}

	shuntEnd(token, stack, output) {
		throw new Error("shunt error: mismatched paretheses.");
	}

}
