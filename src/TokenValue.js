import Token from './Token';

export default class TokenValue extends Token {

	constructor(pattern, precedence) {
		super(pattern, precedence);

		if(this.constructor == TokenValue)
			throw new Error("cannot instantiate abstract TokenValue class");
	}

	operate(token, stack) {
		stack.push(token.value);
	}

}
