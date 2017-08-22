import TokenValue from '../TokenValue';
import {P_VALUE} from '../Precedence';

export default class ValueInteger extends TokenValue {

    constructor() {
        super(/[0-9]+/, P_VALUE);
    }

	shunt(token, stack, output) {
		token.value = parseInt(token.input, 10);
		output.push(token);
	}

}
