import Token from '../Token';
import {P_BRACKET} from '../Precedence';

export default class BracketLeft extends Token {

    constructor() {
        super(/\(/, P_BRACKET);
    }

	shunt(token, stack, output) {
		stack.unshift(token);
	}

}
