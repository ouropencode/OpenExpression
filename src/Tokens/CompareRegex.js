import TokenABOperator from '../TokenABOperator';
import {P_COMP} from '../Precedence';

export default class CompareRegex extends TokenABOperator {

    constructor() {
        super(/~=/, P_COMP, (a, b) => b.test(a));
    }

}
