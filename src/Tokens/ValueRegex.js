import TokenValue from '../TokenValue';
import {P_VALUE} from '../Precedence';

export default class ValueRegex extends TokenValue {

    constructor() {
        super(/#[^#]+#([a-zA-Z]+)?/, P_VALUE);
    }

	shunt(token, stack, output) {
        const match = token.input.match(/#([^/]+)#([a-zA-Z]+)?/);
        token.value = new RegExp(match[1], match[2]);
        output.push(token);
	}

}
