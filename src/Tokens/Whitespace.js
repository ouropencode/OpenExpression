import Token from '../Token';
import {P_ZERO} from '../Precedence';

export default class Whitespace extends Token {

    constructor() {
        super(/\s+/, P_ZERO);
    }

	parse() {
        // let's just ignore whitespace
        return;
    }

}
