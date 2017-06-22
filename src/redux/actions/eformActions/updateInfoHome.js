
import * as types from '../../lib/types';
import diff from 'deep-diff';


export default function updateInfoHome(rolesValue){

    return (dispatch,getState)=>{
        
        var eform = getState().eform;
        
        var templateClone =  Object.assign({},eform.template);
        
        templateClone.roles = rolesValue


        var lhs = {
			name: 'my object',
			description: 'it\'s an object!',
			details: {
				it: 'has',
				an: 'array',
				with: ['a', 'few', 'elements']
			}
		};

		var lhsABC = {
			name: 'my object',
			description: 'it\'s an object!',
			details: {
				it: 'has',
				an: 'array',
				with: ['a', 'few', 'elements']
			}
		};

		var rhs = {
			name: 'updated object',
			description: 'it\'s an object!',
			details: {
				it: 'has',
				an: 'array',
				with: ['a', 'few', 'more', 'elements', { than: 'before' }]
			}
		};

		// var differencesABC = diff(lhs, lhsABC);
		// console.log('differencesABC',differencesABC);

		var differences = diff(lhs, rhs);
		console.log('differences',differences);
        
        dispatch({type: types.UPDATE_FIELD,templateClone});
    };

}
