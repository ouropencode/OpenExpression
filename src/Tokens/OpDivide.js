import TokenABOperator from '../TokenABOperator';
import {P_FACTOR} from '../Precedence';

export default class OpDivide extends TokenABOperator {

    constructor() {
        super(/\//, P_FACTOR, (a, b) => a / b);
    }

}
