# OpenExpression
> Expression parsing and evaluation, as simple as 1 + 1 = 2

While building a sweet little project, we came across a small problem: We needed the ability to take a user input
"condition string" and evaluate it against a known object. After countless hours of searching, we came up blank and
decided that no existing solution satisfied all three of our criteria and decided to build our own library to fill the
gap. So here it is, OpenExpression, a simple expression tokenizer, shunter and evaluator all wrapped into one that is:

1) Small, light-weight and fast.
2) Capable of accepting a context object with use of variables/symbols from the expression.
3) Capable of simple expansion with custom tokens.

Using OpenExpression we can feed in a string like `a + b` and an object like `{ a: 5, b: 10 }` and receive the value
`15`.

**NOTE:** By default, OpenExpression doesn't contain any 'method/function'-like functionality and supports nothing like
`sin()/cos()`. You may be better served by a project like [math.js](http://mathjs.org/) if this is your goal.

## Installation & Usage
To install OpenExpression, simply run the following:

`npm install openexpression --save`

After this, OpenExpression can be used from your code using either of the following usage patterns:
#### Static Usage - for processing a single expression
```js
const OpenExpression = require('openexpression');
console.log(OpenExpression.evaluate('a + b', {
    a: 5,
    b: 10
})); // => 15
```

#### Instance Usage - for processing multiple expressions and other advanced functionality
```js
const OpenExpression = require('openexpression');
let parser = new OpenExpression();
console.log(parser.evaluate('a + b', {
    a: 5,
    b: 10
})); // => 15
console.log(parser.evaluate('a < b && b < 20 && a != 0', {
    a: 5,
    b: 10
})); // => true
```


## Expression Reference

|                |                            | Example                  | Result         | Precedence |
|----------------|----------------------------|--------------------------|----------------|------------|
| **Types**      | Integer                    | `5`                      | `5`            | P_ZERO     |
|                | Float                      | `1.35`                   | `1.35`         | P_ZERO     |
|                | String                     | `"TEST"`                 | `"TEST"`       | P_ZERO     |
|                | RegExp                     | `#t[es]{2}t#i`           | `/t[es]{2}t/i` | P_ZERO     |
| **Math**       | + (Add)                    | `2 + 4`                  | `6`            | P_TERM     |
|                | - (Subtract)               | `5 - 2`                  | `3`            | P_TERM     |
|                | * (Multiply)               | `3 * 4`                  | `12`           | P_FACTOR   |
|                | / (Divide)                 | `9 / 3`                  | `3`            | P_FACTOR   |
| **Comparison** | == (Equal)                 | `3 == 3`                 | `true`         | P_COMP     |
|                |                            | `5 == 3`                 | `false`        |            |
|                | != (Not Equal)             | `5 != 3`                 | `true`         | P_COMP     |
|                |                            | `5 != 5`                 | `false`        |            |
|                | >= (Greater Than or Equal) | `5 >= 3`                 | `true`         | P_COMP     |
|                |                            | `3 >= 3`                 | `true`         |            |
|                |                            | `1 >= 3`                 | `false`        |            |
|                | <= (Less Than or Equal)    | `3 <= 5`                 | `true`         | P_COMP     |
|                |                            | `3 <= 3`                 | `true`         |            |
|                |                            | `5 <= 3`                 | `false`        |            |
|                | ~= (RegExp Match)          | `"TEST" ~= #t[es]{2}t#i` | `true`         | P_COMP     |
|                | && (Logical AND)           | `true && true`           | `true`         | P_BOOL     |
|                |                            | `true && false`          | `false`        |            |
|                | &#124;&#124; (Logical OR)  | `true \|\| false`        | `true`         | P_BOOL     |
|                |                            | `false \|\| false`       | `false`        |            |
| **Brackets**   | ( and )                    | `(3 + 2) * (6 - 4)`      | `10`           | B_BRACKET  |

**NOTE:** Strings are only supporting using double-quotes (`"`), there is no single-quote support.

#### Precedence
All expressions are shunted before evaluations to arrange the tokens for execution. During this stage we calculate the
order of operations (known as the Precedence). Operators with a lower precedence are evaluated first. Precedence can be
modified using brackets, operations within brackets will be evaluated first. Precedence is defined using a set of
constant integers (exposed as `OpenExpression.Precedence`) spaced by 10, this allows any custom tokens to be defined
anywhere amongst the existing tokens. Below are the values at time of writing:

| Constant    | Value   |
|-------------|---------|
| `P_ZERO`    | `0`     |
| `P_VALUE`   | `10`    |
| `P_BRACKET` | `20`    |
| `P_BOOL`    | `30`    |
| `P_COMP`    | `40`    |
| `P_TERM`    | `50`    |
| `P_FACTOR`  | `60`    |

## API Reference

#### `[mixed] OpenExpression.evaluate(expression, context = {}, deepOuput = false)`
- *[string] expression*: the expression to evaluate
- *[object] context*: an object containing the symbol context
- *[bool] deepOuput*: should we return in-depth data, instead of the return value (see below)

A simple interface for one-time evaluation of an expression. This will simply return the response of the expression
using the symbol context provided. If multiple expressions are to be evaluated, it's advised to create an instance
(`const instance = new OpenExpression()`) and operate using `instance.evaluate`.

#### `[mixed] instance.evaluate(expression, context = {}, deepOuput = false)`
- *[string] expression*: the expression to evaluate
- *[object] context*: an object containing the symbol context
- *[bool] deepOuput*: should we return in-depth data, instead of the return value

Returns the response of the expression using the symbol context provided. If `deepOutput` is set to true, you will
receive an object as a response, this object will contain the return value alongside additional information:

| Key              | Value                                                                                          |
|------------------|------------------------------------------------------------------------------------------------|
| `value`          | [mixed] contains the return value                                                              |
| `aborted`        |  [bool] was the evaluation aborted during execution?                                           |
| `aborted_value`  | [mixed] the value returned when aborting. (this is for non-error aborts, errors throw instead) |
| `stack`          | [array] the full contents of the stack.                                                        |

#### `[array] instance.tokenize(expression)`
- *[string] expression*: the expression to tokenize

Parse an expression into an array of tokens.

#### `[array] instance.shunt(tokens)`
- *[array] tokens*: an array of tokens to shunt

Shunt an array of tokens using an implementation of Edsger Wybe Dijkstra's Shunting Yard Algorithm. This arranges the
tokens in a much more useful format for execution.

#### `[array] instance.execute(tokens, context = {}, deepOuput = false)`
- *[array] tokens*: an array of shunted tokens to execute
- *[object] context*: an object containing the symbol context
- *[bool] deepOuput*: should we return in-depth data, instead of the return value

Execute and return the response from an array of shunted tokens using the symbol context provided.

#### `[void] instance.addToken(token)`
- *[object] token*: the token description
Add a custom token for parsing/execution. The token must be an instance of a custom class that extends the 'Token' class
described below. Additional base classes are available that make this slightly easier: `TokenABOperator` for creating
tokens that operate upon two values in the stack (addition/subtraction/etc make use of this) and `TokenValue` for
creating tokens that are purely values. You should check the existing tokens in the `./src/Tokens/` folder for more
examples of how a Token is structured.

```js
import {OpenExpression, Token, Precedence} from 'OpenExpression';

export default class CUSTOM_TOKEN extends Token {

    constructor() {
        super(/regex_pattern_to_match/, Precedence.P_ZERO);
    }

	shunt(token, stack, output) {
        // [.. shunt ..]
	}

    shuntEnd(token, stack, output) {
        // [.. shunt when left on stack ..]
    }

    operate(token, stack, context, abort) {
		// [.. operate ..]
    }

}

// usage:
const OpenExpression = require('openexpression');
let parser = new OpenExpression();
parser.addToken(new CUSTOM_TOKEN());
// now you may use your token in an .evaluate call
```

## Tests
OpenExpression has a test suite that tests all basic functionality works as expected. If you find any exceptional cases
that break the library, let us know about it and we'll make another test and try to fix it! Tests are written using the
(Buster.JS)[http://busterjs.org] testing toolkit. Tests can be run with the following commands:

    npm install openexpression --only=dev
    npm test

## Contributing
Get involved! OpenExpression is currently a small project, maintained by a small team. We would welcome any
contributions to the codebase, either via Issues or Pull Requests.

## Maintainers
- **Peter Corcoran** (R4wizard)

## License, Copyright & Credits
OpenExpression is an open source project licensed under the LGPLv3 licenses, you can find more details regarding this
license in the `LICENSE.md` file.

This library was created using the following resources as inspiration and reference material:
- https://gist.github.com/aaditmshah/6683499
- https://stackoverflow.com/questions/23325832/parse-arithmetic-expression-with-javascript
