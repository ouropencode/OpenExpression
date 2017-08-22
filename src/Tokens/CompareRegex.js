import TokenABOperator from '../TokenABOperator';
import {P_COMP} from '../Precedence';

export default class CompareRegex extends TokenABOperator {

    constructor() {
        super(/~=/, P_COMP, (a, b) => {
			if(typeof b == 'regex')
				return b.test(a);
				
			if(typeof b == 'string');
				return a.indexOf(b) !== -1;

			return false;
		});
    }

}
