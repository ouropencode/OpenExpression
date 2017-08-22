import TokenABOperator from '../TokenABOperator';
import {P_COMP} from '../Precedence';

export default class CompareRegex extends TokenABOperator {

    constructor() {
        super(/~=/, P_COMP, (a, b) => {
			if(b instanceof RegExp)
				return b.test(a);

			if(typeof b == 'string');
				return a.indexOf(b) !== -1;

			return false;
		});
    }

}
