import TokenValue from '../TokenValue';
import {P_VALUE} from '../Precedence';

export default class ValueSymbol extends TokenValue {

    constructor() {
        super(/[a-zA-Z_]+[a-zA-Z0-9._-]*/, P_VALUE);
    }

	shunt(token, stack, output) {
		token.value = token.input.split('.');
		output.push(token);
	}

    operate(token, stack, context) {
        const path = token.value;

        let value = context[path[0]];
        for(let i = 1; i < path.length; i++) {
            if(typeof value != 'object')
                return stack.push(undefined);

            value = value[path[i]];
        }

        stack.push(value);
    }

}
