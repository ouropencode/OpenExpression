import TokenABOperator from '../TokenABOperator';
import {P_TERM} from '../Precedence';

export default class OpSubtract extends TokenABOperator {

    constructor() {
        super(/-/, P_TERM, (a, b) => a - b);
    }

}
