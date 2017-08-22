import buster from 'buster';
import OpenExpression from '../lib';

import OpResult from './_OpResult.js';

let OE = null;

buster.testCase("Expansions - Additional Token", {
    setUp: () => {
        OE = new OpenExpression();
        OE.addToken(new OpResult());
    },

    "result opcode - success": () => buster.assert.equals(OE.evaluate("true: success"), "success"),
    "result opcode - warning": () => buster.assert.equals(OE.evaluate("true: warning"), "warning"),
    "result opcode - failure": () => buster.assert.equals(OE.evaluate("true: failure"), "failure"),
    "result opcode - blank":   () => buster.assert.equals(OE.evaluate("false: success"), false),

    "result opcode - final": () => {
        const response = OE.evaluate("true: success!", {}, true);

        buster.assert.equals(response.value,        "success");
        buster.assert.equals(response.aborted,       true);
        buster.assert.equals(response.aborted_value, undefined);
        buster.assert.equals(response.stack,         []);
    },

    "result opcode - complex": () => {
        const response = OE.evaluate("(source.ip == \"192.168.0.1\" && source.port == 7777) || (date.year > 2018): warning!", {
            source: { ip: "192.168.0.1", port: 7777},
            date: { year: 2018 }
        }, true);

        buster.assert.equals(response.value,        "warning");
        buster.assert.equals(response.aborted,       true);
        buster.assert.equals(response.aborted_value, undefined);
        buster.assert.equals(response.stack,         []);
    }

});
