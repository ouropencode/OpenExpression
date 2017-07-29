const buster = require("buster");
const OE     = require("../");

buster.testCase("Expansions - Additional Token", {
    setUp: () => {
        this.OE = new OE();
        this.OE.addToken({
            opcode:      "RESULT",
            pattern:     /:\s*(success|warning|failure)(!)?/,
            precendence: 15,
            operator:    (t, a) => {
                const result = t.input.match(/:\s*(success|warning|failure)(!)?/);
                if(a == true)
                    return [result[1], (result[2] == "!")];
                return false;
            }
        });
    },

    "result opcode - success": () => buster.assert.equals(this.OE.evaluate("true: success"), ["success", false]),
    "result opcode - warning": () => buster.assert.equals(this.OE.evaluate("true: warning"), ["warning", false]),
    "result opcode - failure": () => buster.assert.equals(this.OE.evaluate("true: failure"), ["failure", false]),
    "result opcode - blank":   () => buster.assert.equals(this.OE.evaluate("false: success"), false),

    "result opcode - final": () => buster.assert.equals(this.OE.evaluate("true: success!"), ["success", true]),

    "result opcode - complex": () => buster.assert.equals(this.OE.evaluate("(source.ip == \"192.168.0.1\" && source.port == 7777) || (date.year > 2018): warning!", {
        source: { ip: "192.168.0.1", port: 7777},
        date: { year: 2018 }
    }), ["warning", true])

});
