import TokenABOperator from '../TokenABOperator';
import {P_COMP} from '../Precedence';

export default class CompareLessThan extends TokenABOperator {

    constructor() {
        super(/</, P_COMP, (a, b) => a < b);
    }

}
