import TokenValue from '../TokenValue';
import {P_VALUE} from '../Precedence';

export default class ValueFloat extends TokenValue {

    constructor() {
        super(/[0-9]+\.[0-9]+/, P_VALUE);
    }

	shunt(token, stack, output) {
		token.value = parseFloat(token.input, 10);
		output.push(token);
	}

}
