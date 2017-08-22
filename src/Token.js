export default class Token {

	constructor(pattern, precedence) {
		if(this.constructor == Token)
			throw new Error("cannot instantiate abstract Token class");

		this.opcode     = this.constructor.name;
		this.pattern    = pattern;
		this.precedence = precedence;
	}

	parse(input) {
		return {
			token: this,
			input: input
		};
	}

	shunt(token, stack, output) {
		while(stack.length) {
			const punctuator = stack[0];

			if(punctuator.token.opcode == "BracketLeft") break;

			const precedence  = token.token.precedence;
			const antecedence = punctuator.token.precedence;

			if(precedence > antecedence || precedence == antecedence && token.associativity == "right")
				break;

			output.push(stack.shift());
		}

		stack.unshift(token);
	}

	shuntEnd(token, stack, output) {
		output.push(token);
	}

	operate(token, stack, context, abort) {

	}

	toString() {
		return this.opcode;
	}

}
