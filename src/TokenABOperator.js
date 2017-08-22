import Token from './Token';

export default class TokenABOperator extends Token {

	constructor(pattern, precedence, operator) {
		super(pattern, precedence);

		if(this.constructor == TokenABOperator)
			throw new Error("cannot instantiate abstract TokenABOperator class");

		this._operator = operator;
	}

	operate(token, stack) {
		const b = stack.pop();
		const a = stack.pop();
		stack.push(this._operator(a, b));
	}

}
