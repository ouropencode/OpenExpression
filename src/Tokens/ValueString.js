import TokenValue from '../TokenValue';
import {P_VALUE} from '../Precedence';

export default class ValueString extends TokenValue {

    constructor() {
        super(/"[^"]+"/, P_VALUE);
    }

    shunt(token, stack, output) {
        token.value = token.input.substr(1, token.input.length - 2);
        output.push(token);
	}

}
