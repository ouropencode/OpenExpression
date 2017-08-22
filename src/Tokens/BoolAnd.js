import TokenABOperator from '../TokenABOperator';
import {P_BOOL} from '../Precedence';

export default class OpAnd extends TokenABOperator {

    constructor() {
        super(/&&/, P_BOOL, (a, b) => !!(a && b));
    }

}
